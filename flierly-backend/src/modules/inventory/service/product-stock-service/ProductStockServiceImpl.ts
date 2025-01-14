import { inject, injectable } from "inversify";
import ProductStockService from "./ProductStockService";
import { EntityManager, Repository } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import Product from "../../entities/Product.entity";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { InventoryStockType } from "../../constants/inventory-stock-type.enum";
import InventoryModuleBeanTypes from "../../ioc-config/bean.types";
import InventoryLedgerService from "../inventory-ledger-service/InventoryLedgerService";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import SerializedProductService from "../serialized-product-service/SerializedProductService";
import { SerializedProductStatus } from "../../constants/serialized-product-status.enum";
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";
import { ProductType } from "../../constants/product-type.enum";

@injectable()
class ProductStockServiceImpl implements ProductStockService {

    private readonly productStockRepository: Repository<ProductStock>;
    private readonly productRepository: Repository<Product>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(InventoryModuleBeanTypes.InventoryLedgerService) private readonly inventoryLedgerService: InventoryLedgerService,
        @inject(InventoryModuleBeanTypes.SerializedProductService) private readonly serializedProductService: SerializedProductService,
    ) {
        this.productStockRepository = this.databaseService.getRepository(ProductStock);
        this.productRepository = this.databaseService.getRepository(Product);
    };

    async initializeStock(productId: number, branchId: number, entityManager?: EntityManager): Promise<ProductStock> {
        try {
            const product = await this.productRepository.findOne({ where: { id: productId } });

            if (!product) {
                throw new Error('Product not found');
            }

            const productStock = this.productStockRepository.create({
                product: { id: productId },
                branch: { id: branchId },
                defective: 0,
                onHand: product.type === ProductType.INTANGIBLE ? 9999 : 0,
                onOrder: 0,
                reserved: 0,
            });

            await validateEntityInstance(productStock);

            if (entityManager) {
                return await entityManager.save(ProductStock, productStock);
            } else {
                return await this.productStockRepository.save(productStock);
            };

        } catch (error) {
            throw error;
        }
    };

    async updateStock(
        productId: number,
        branchId: number,
        quantity: number,
        stockType: InventoryStockType,
        serialNumber?: string,
        transactionType?: InventoryStockTransactionType,
        reason?: string,
        referenceId?: string
    ): Promise<ProductStock> {
        try {
            const updatedProductStock = await this.databaseService.executeTransaction<ProductStock>(async (entityManager) => {
                // Retrieve or initialize product stock
                let isInitializedForFirstTime;
                let productStock = await entityManager.findOne(ProductStock, {
                    where: { branch: { id: branchId }, product: { id: productId } },
                    relations: ['product', "branch"],
                });

                if (!productStock) {
                    await this.initializeStock(productId, branchId, entityManager);
                    productStock = await entityManager.findOneOrFail(ProductStock, {
                        where: { branch: { id: branchId }, product: { id: productId } },
                        relations: ['product', "branch"],
                    });
                    isInitializedForFirstTime = true;
                }

                const product = productStock.product;

                if (product.type === ProductType.INTANGIBLE) {
                    if (isInitializedForFirstTime) {
                        // Save updated stock and create ledger entry
                        await validateEntityInstance(productStock);
                        const updatedProductStock = await entityManager.save(productStock);
                        await this.inventoryLedgerService.newTransaction(
                            productId,
                            branchId,
                            9999,
                            InventoryStockType.ON_HAND,
                            undefined,
                            InventoryStockTransactionType.STOCK_ADJUSTMENT,
                            `Intangible product initialization.`,
                            undefined
                        );
                        return updatedProductStock;
                    } else {
                        throw new FlierlyException('Cannot update stock for intangible products', HttpCodes.BAD_REQUEST);
                    }
                }

                const isSerialized = product.isSerialized;

                if (isSerialized) {
                    if (!serialNumber) {
                        throw new FlierlyException('Serial number is required for serialized products', HttpCodes.BAD_REQUEST);
                    }

                    if (Math.abs(quantity) > 1) {
                        throw new FlierlyException('Serialized products stock can only be updated one at a time', HttpCodes.BAD_REQUEST);
                    }

                    const serializedProductService = this.serializedProductService;

                    switch (stockType) {
                        case InventoryStockType.ON_HAND:
                            if (quantity > 0) {
                                await serializedProductService.updateAdjustedOrCreateNew(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    undefined,
                                    entityManager
                                );

                                productStock.onHand += quantity;

                            } else {
                                await serializedProductService.updateStatus(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    SerializedProductStatus.ADJUSTED,
                                    undefined,
                                    entityManager
                                );
                                productStock.onHand += quantity;
                            }
                            break;

                        case InventoryStockType.RESERVED:
                            if (quantity > 0) {
                                this.validateAvailableStock(productStock, 1);
                                await serializedProductService.updateStatus(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    SerializedProductStatus.RESERVED,
                                    undefined,
                                    entityManager
                                );
                                productStock.reserved += quantity;
                            } else {
                                this.validateReservedStock(productStock, quantity);
                                await serializedProductService.updateStatus(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    SerializedProductStatus.AVAILABLE,
                                    undefined,
                                    entityManager
                                );
                                productStock.reserved += quantity;
                            }
                            break;

                        case InventoryStockType.DEFECTIVE:
                            if (quantity > 0) {
                                this.validateAvailableStock(productStock, 1);
                                await serializedProductService.updateStatus(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    SerializedProductStatus.DEFECTIVE,
                                    undefined,
                                    entityManager
                                );
                                productStock.defective += quantity;
                            } else {
                                this.validateDefectiveStock(productStock, quantity);
                                await serializedProductService.updateStatus(
                                    productId,
                                    branchId,
                                    serialNumber,
                                    SerializedProductStatus.AVAILABLE,
                                    undefined,
                                    entityManager
                                );
                                productStock.defective += quantity;
                            }
                            break;

                        default:
                            throw new FlierlyException('Invalid stock type for serialized products', HttpCodes.BAD_REQUEST);
                    }
                } else {
                    // Handle non-serialized products
                    this.adjustNonSerializedStock(productStock, stockType, quantity);
                }

                this.validateStockConsistency(productStock);

                // Save updated stock and create ledger entry
                await validateEntityInstance(productStock);
                const updatedProductStock = await entityManager.save(productStock);

                await this.inventoryLedgerService.newTransaction(
                    productId,
                    branchId,
                    quantity,
                    stockType,
                    serialNumber,
                    transactionType,
                    reason,
                    referenceId
                );

                return updatedProductStock;
            });

            return updatedProductStock;
        } catch (error) {
            throw new FlierlyException(
                `Failed to adjust stock: ${(error as Error).message}`,
                HttpCodes.BAD_REQUEST,
                JSON.stringify(error)
            );
        }
    }

    private validateAvailableStock(productStock: ProductStock, required: number): void {
        if (productStock.onHand - productStock.reserved - productStock.defective < required) {
            throw new FlierlyException('Insufficient available stock', HttpCodes.BAD_REQUEST);
        }
    }

    private validateReservedStock(productStock: ProductStock, quantity: number): void {
        if (productStock.reserved < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient reserved stock to remove', HttpCodes.BAD_REQUEST);
        }
    }

    private validateDefectiveStock(productStock: ProductStock, quantity: number): void {
        if (productStock.defective < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient defective stock to remove', HttpCodes.BAD_REQUEST);
        }
    }

    private adjustNonSerializedStock(productStock: ProductStock, stockType: InventoryStockType, quantity: number): void {
        switch (stockType) {
            case InventoryStockType.ON_HAND:
                productStock.onHand += quantity;
                break;

            case InventoryStockType.RESERVED:
                if (quantity > 0) {
                    this.validateAvailableStock(productStock, quantity);
                    productStock.reserved += quantity;
                } else {
                    this.validateReservedStock(productStock, quantity);
                    productStock.reserved += quantity;
                }
                break;

            case InventoryStockType.DEFECTIVE:
                if (quantity > 0) {
                    this.validateAvailableStock(productStock, quantity);
                    productStock.defective += quantity;
                } else {
                    this.validateDefectiveStock(productStock, quantity);
                    productStock.defective += quantity;
                }
                break;

            case InventoryStockType.ON_ORDER:
                productStock.onOrder += quantity;
                break;

            default:
                throw new FlierlyException('Invalid stock type for non-serialized products', HttpCodes.BAD_REQUEST);
        }
    }

    private validateStockConsistency(productStock: ProductStock): void {
        if (productStock.onHand < productStock.reserved + productStock.defective) {
            throw new FlierlyException(
                'Inconsistent stock values: Reserved and defective stock cannot exceed on-hand stock',
                HttpCodes.BAD_REQUEST
            );
        }
    }
};

export default ProductStockServiceImpl;