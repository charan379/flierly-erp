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
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";
import { ProductType } from "../../constants/product-type.enum";

@injectable()
class ProductStockServiceImpl implements ProductStockService {

    private readonly productStockRepository: Repository<ProductStock>;
    private readonly productRepository: Repository<Product>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(InventoryModuleBeanTypes.InventoryLedgerService) private readonly inventoryLedgerService: InventoryLedgerService,
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
        transactionType: InventoryStockTransactionType.SALES_ORDER | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void> {
        try {
            await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {

                this.validatePostiveQty(quantity);

                let entityManager = transactionManager || entityManagerLocal;

                let productStock = await this.getProductStock(productId, branchId);

                if (updateType === "add") {
                    this.validateAvailableStock(productStock, quantity);
                    productStock.reserved += quantity;
                } else {
                    this.validateReservedStock(productStock, quantity);
                    productStock.reserved -= quantity;
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
        } catch (error) {
            if (error instanceof FlierlyException) {
                throw error;
            } else {
                throw new FlierlyException((error as Error).message, HttpCodes.BAD_REQUEST);
            }
        }
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
        try {
            await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {
                this.validatePostiveQty(quantity);

                let entityManager = transactionManager || entityManagerLocal;

                let productStock = await this.getProductStock(productId, branchId);

                if (updateType === "add") {
                    this.validateAvailableStock(productStock, quantity);
                    productStock.defective += quantity;
                } else {
                    this.validateDefectiveStock(productStock, quantity);
                    productStock.defective -= quantity;
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
        } catch (error) {
            if (error instanceof FlierlyException) {
                throw error;
            } else {
                throw new FlierlyException((error as Error).message, HttpCodes.BAD_REQUEST);
            }
        }
    };

    async updateOnHand(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType:
            InventoryStockTransactionType.TRANSFER_IN
            | InventoryStockTransactionType.TRANSFER_OUT
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
        try {
            await this.databaseService.executeTransaction<void>(async (entityManagerLocal) => {
                this.validatePostiveQty(quantity);

                let entityManager = transactionManager || entityManagerLocal;

                let productStock = await this.getProductStock(productId, branchId);

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
                        InventoryStockTransactionType.TRANSFER_OUT,
                        InventoryStockTransactionType.STOCK_DISPOSAL,
                        InventoryStockTransactionType.SALES_INVOICE,
                    ].includes(transactionType)) {
                        throw new Error(`Products cannot be removed from ${InventoryStockType.ON_HAND} with ${transactionType} type.`);
                    };
                    this.validateAvailableStock(productStock, quantity);
                    productStock.onHand -= quantity;
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
        } catch (error) {
            if (error instanceof FlierlyException) {
                throw error;
            } else {
                throw new FlierlyException((error as Error).message, HttpCodes.BAD_REQUEST);
            }

        }
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