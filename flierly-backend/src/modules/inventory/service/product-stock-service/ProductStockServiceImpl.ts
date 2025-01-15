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

    private async getProductStock(productId: number, branchId: number): Promise<ProductStock> {
        let productStock = await this.productStockRepository.findOne({
            where: { branch: { id: branchId }, product: { id: productId } },
            relations: ['product', "branch"],
        });

        if (!productStock) {
            throw new FlierlyException(`No Stock management records found for product ${productId} in branch ${branchId}`, HttpCodes.NOT_FOUND);
        }

        return productStock;
    };

    private validateSerializedProductContrainsts(quantity: number, serialNumber?: string): void {
        if (!serialNumber) {
            throw new FlierlyException('Serial number is required for serialized products', HttpCodes.BAD_REQUEST);
        }

        if (Math.abs(quantity) > 1) {
            throw new FlierlyException('Serialized products stock can only be updated one at a time', HttpCodes.BAD_REQUEST);
        }
    };

    private validatePostiveQty(quantity: number): void {
        if (quantity <= 0) {
            throw new FlierlyException('Quantity must be a positive number', HttpCodes.BAD_REQUEST);
        }
    };

    private validateAvailableStock(productStock: ProductStock, required: number): void {
        if (productStock.onHand - productStock.reserved - productStock.defective < Math.abs(required)) {
            throw new FlierlyException('Insufficient available stock', HttpCodes.BAD_REQUEST);
        }
    };

    private validateReservedStock(productStock: ProductStock, quantity: number): void {
        if (productStock.reserved < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient reserved stock to remove', HttpCodes.BAD_REQUEST);
        }
    };

    private validateDefectiveStock(productStock: ProductStock, quantity: number): void {
        if (productStock.defective < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient defective stock to remove', HttpCodes.BAD_REQUEST);
        }
    };

    async updateReserve(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.SALES_ORDER | InventoryStockTransactionType.TRANSFER_OUT | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void> {
        await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {
            this.validatePostiveQty(quantity);

            let entityManager = transactionManager || entityManagerLocal;

            let productStock = await this.getProductStock(productId, branchId);

            const product = productStock.product;

            if (product.isSerialized) {
                this.validateSerializedProductContrainsts(quantity, serialNumber);

                if (updateType === "add") {
                    this.validateAvailableStock(productStock, 1);
                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        SerializedProductStatus.RESERVED,
                        referenceId,
                        entityManager
                    );
                    productStock.reserved += quantity;
                } else {
                    this.validateReservedStock(productStock, quantity);
                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        SerializedProductStatus.AVAILABLE,
                        referenceId,
                        entityManager
                    );
                    productStock.reserved -= quantity;
                }
            } else {
                if (updateType === "add") {
                    this.validateAvailableStock(productStock, quantity);
                    productStock.reserved += quantity;
                } else {
                    this.validateReservedStock(productStock, quantity);
                    productStock.reserved -= quantity;
                }
            }

            this.validateStockConsistency(productStock);

            await validateEntityInstance(productStock);

            await this.inventoryLedgerService.newTransaction(
                productId,
                branchId,
                updateType === "add" ? quantity : -quantity,
                InventoryStockType.RESERVED,
                serialNumber,
                transactionType,
                reason,
                referenceId
            );

            await entityManager.save(productStock);
        });
    }

    async updateDefective(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.SALES_RETURN_DEFECTIVE | InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void> {
        await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {
            this.validatePostiveQty(quantity);

            let entityManager = transactionManager || entityManagerLocal;

            let productStock = await this.getProductStock(productId, branchId);

            const product = productStock.product;

            if (product.isSerialized) {
                this.validateSerializedProductContrainsts(quantity, serialNumber);

                if (updateType === "add") {
                    if (![InventoryStockTransactionType.SALES_RETURN_DEFECTIVE, InventoryStockTransactionType.MANUAL_ADJUSTMENT].includes(transactionType)) {
                        throw new Error(`Products cannot be added to ${InventoryStockType.DEFECTIVE} with ${transactionType} type.`);
                    };
                    this.validateAvailableStock(productStock, 1);
                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        SerializedProductStatus.DEFECTIVE,
                        referenceId,
                        entityManager
                    );
                    productStock.defective += quantity;
                } else {
                    if (![InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE, InventoryStockTransactionType.MANUAL_ADJUSTMENT].includes(transactionType)) {
                        throw new Error(`Products cannot be removed from ${InventoryStockType.DEFECTIVE} with ${transactionType} type.`);
                    };
                    this.validateDefectiveStock(productStock, quantity);
                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        SerializedProductStatus.AVAILABLE,
                        referenceId,
                        entityManager
                    );
                    productStock.defective -= quantity;
                }
            } else {
                if (updateType === "add") {
                    if (![InventoryStockTransactionType.SALES_RETURN_DEFECTIVE, InventoryStockTransactionType.MANUAL_ADJUSTMENT].includes(transactionType)) {
                        throw new Error(`Products cannot be added to ${InventoryStockType.DEFECTIVE} with ${transactionType} type.`);
                    };
                    this.validateAvailableStock(productStock, quantity);
                    productStock.defective += quantity;
                } else {
                    if (![InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE, InventoryStockTransactionType.MANUAL_ADJUSTMENT].includes(transactionType)) {
                        throw new Error(`Products cannot be removed from ${InventoryStockType.DEFECTIVE} with ${transactionType} type.`);
                    };
                    this.validateDefectiveStock(productStock, quantity);
                    productStock.defective -= quantity;
                }
            }

            this.validateStockConsistency(productStock);

            await validateEntityInstance(productStock);

            await this.inventoryLedgerService.newTransaction(
                productId,
                branchId,
                updateType === "add" ? quantity : -quantity,
                InventoryStockType.DEFECTIVE,
                serialNumber,
                transactionType,
                reason,
                referenceId
            );

            await entityManager.save(productStock);
        });
    };

    async updateOnHand(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.TRANSFER_IN
            | InventoryStockTransactionType.MANUAL_ADJUSTMENT
            | InventoryStockTransactionType.PURCHASE_INVOICE
            | InventoryStockTransactionType.PURCHASE_RETURN_OK
            | InventoryStockTransactionType.SALES_RETURN_OK
            | InventoryStockTransactionType.SALES_INVOICE
            | InventoryStockTransactionType.STOCK_DISPOSAL,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void> {
        await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {
            this.validatePostiveQty(quantity);

            let entityManager = transactionManager || entityManagerLocal;

            let productStock = await this.getProductStock(productId, branchId);

            const product = productStock.product;

            if (product.isSerialized) {
                this.validateSerializedProductContrainsts(quantity, serialNumber);

                if (updateType === "add") {
                    if (![
                        InventoryStockTransactionType.TRANSFER_IN,
                        InventoryStockTransactionType.MANUAL_ADJUSTMENT,
                        InventoryStockTransactionType.PURCHASE_INVOICE,
                        InventoryStockTransactionType.SALES_RETURN_OK,
                    ].includes(transactionType)) {
                        throw new Error(`Products cannot be added to ${InventoryStockType.ON_HAND} with ${transactionType} type.`);
                    };

                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        SerializedProductStatus.AVAILABLE,
                        referenceId,
                        entityManager
                    );
                    productStock.onHand += quantity;
                } else {
                    this.validateAvailableStock(productStock, quantity);
                    let serializedStatus: SerializedProductStatus | undefined;
                    if ([InventoryStockTransactionType.STOCK_DISPOSAL].includes(transactionType)) {
                        serializedStatus = SerializedProductStatus.DISPOSED;
                    };
                    if ([InventoryStockTransactionType.SALES_INVOICE].includes(transactionType)) {
                        serializedStatus = SerializedProductStatus.SOLD;
                    };
                    if ([InventoryStockTransactionType.TRANSFER_OUT].includes(transactionType)) {
                        serializedStatus = SerializedProductStatus.AVAILABLE
                    };
                    if (!serializedStatus) {
                        throw new Error(`Products cannot be removed from ${InventoryStockType.ON_HAND} with ${transactionType} type.`);
                    };
                    await this.serializedProductService.updateStatus(
                        productId,
                        branchId,
                        serialNumber!,
                        serializedStatus,
                        referenceId,
                        entityManager
                    );
                    productStock.onHand -= quantity;
                }
            } else {
                if (updateType === "add") {
                    if (![
                        InventoryStockTransactionType.TRANSFER_IN,
                        InventoryStockTransactionType.MANUAL_ADJUSTMENT,
                        InventoryStockTransactionType.PURCHASE_INVOICE,
                        InventoryStockTransactionType.SALES_RETURN_OK,
                    ].includes(transactionType)) {
                        throw new Error(`Products cannot be added to ${InventoryStockType.ON_HAND} with ${transactionType} type.`);
                    };
                    productStock.onHand += quantity;
                } else {
                    if (![
                        InventoryStockTransactionType.STOCK_DISPOSAL,
                        InventoryStockTransactionType.SALES_INVOICE,
                        InventoryStockTransactionType.TRANSFER_OUT,
                    ].includes(transactionType)) {
                        throw new Error(`Products cannot be removed from ${InventoryStockType.ON_HAND} with ${transactionType} type.`);
                    };
                    this.validateAvailableStock(productStock, quantity);
                    productStock.onHand -= quantity;
                }
            }

            this.validateStockConsistency(productStock);

            await validateEntityInstance(productStock);
            await entityManager.save(productStock);

            await this.inventoryLedgerService.newTransaction(
                productId,
                branchId,
                updateType === "add" ? quantity : -quantity,
                InventoryStockType.ON_HAND,
                serialNumber,
                transactionType,
                reason,
                referenceId
            );
        });
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
                            InventoryStockTransactionType.MANUAL_ADJUSTMENT,
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
                                await serializedProductService.pullBackDisposedOrCreateNew(
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
                                    SerializedProductStatus.DISPOSED,
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