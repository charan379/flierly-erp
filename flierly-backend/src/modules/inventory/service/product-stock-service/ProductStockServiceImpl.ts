/**
 * ProductStockServiceImpl is an implementation of the ProductStockService interface.
 * It manages the stock of products in a specific branch, allowing for operations such as
 * updating reserved, defective, and on-hand stock quantities, as well as initializing stock.
 * The service uses TypeORM for database interactions and Inversify for dependency injection.
 */

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

    /**
     * Constructor for ProductStockServiceImpl.
     * @param databaseService - The service for database operations.
     * @param inventoryLedgerService - The service for managing inventory ledger transactions.
     */
    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(InventoryModuleBeanTypes.InventoryLedgerService) private readonly inventoryLedgerService: InventoryLedgerService,
    ) {
        this.productStockRepository = this.databaseService.getRepository(ProductStock);
        this.productRepository = this.databaseService.getRepository(Product);
    };

    async updateOnOrder(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.PURCHASE_ORDER | InventoryStockTransactionType.PURCHASE_INVOICE | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
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
                        InventoryStockTransactionType.PURCHASE_ORDER,
                        InventoryStockTransactionType.MANUAL_ADJUSTMENT
                    ].includes(transactionType)) {
                        throw new Error(`Products cannot be added to on-order with ${transactionType} type.`);
                    }
                    productStock.onOrder += quantity;
                } else {
                    if (productStock.onOrder < quantity) {
                        throw new FlierlyException('Insufficient on-order quantity', HttpCodes.BAD_REQUEST);
                    }
                    productStock.onOrder -= quantity;
                }

                await validateEntityInstance(productStock);

                await this.inventoryLedgerService.newTransaction(
                    productId,
                    branchId,
                    updateType === "add" ? quantity : -quantity,
                    InventoryStockType.ON_ORDER,
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
            }
            throw new FlierlyException((error as Error).message, HttpCodes.BAD_REQUEST);
        }
    };

    /**
     * Retrieves the product stock for a specific product in a branch.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @returns The ProductStock entity.
     * @throws FlierlyException if no stock records are found.
     */
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

    /**
     * Validates that the quantity is a positive number.
     * @param quantity - The quantity to validate.
     * @throws FlierlyException if the quantity is not positive.
     */
    private validatePostiveQty(quantity: number): void {
        if (quantity <= 0) {
            throw new FlierlyException('Quantity must be a positive number', HttpCodes.BAD_REQUEST);
        }
    };

    /**
     * Validates that there is sufficient available stock.
     * @param productStock - The ProductStock entity.
     * @param required - The required quantity.
     * @throws FlierlyException if there is insufficient available stock.
     */
    private validateAvailableStock(productStock: ProductStock, required: number): void {
        if (productStock.onHand - productStock.reserved - productStock.defective < Math.abs(required)) {
            throw new FlierlyException('Insufficient available stock', HttpCodes.BAD_REQUEST);
        }
    };

    /**
     * Validates that there is sufficient reserved stock to remove.
     * @param productStock - The ProductStock entity.
     * @param quantity - The quantity to remove.
     * @throws FlierlyException if there is insufficient reserved stock.
     */
    private validateReservedStock(productStock: ProductStock, quantity: number): void {
        if (productStock.reserved < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient reserved stock to remove', HttpCodes.BAD_REQUEST);
        }
    };

    /**
     * Validates that there is sufficient defective stock to remove.
     * @param productStock - The ProductStock entity.
     * @param quantity - The quantity to remove.
     * @throws FlierlyException if there is insufficient defective stock.
     */
    private validateDefectiveStock(productStock: ProductStock, quantity: number): void {
        if (productStock.defective < Math.abs(quantity)) {
            throw new FlierlyException('Insufficient defective stock to remove', HttpCodes.BAD_REQUEST);
        }
    };

    /**
     * Updates the reserved stock for a product in a branch.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param quantity - The quantity to update.
     * @param updateType - The type of update ("add" or "remove").
     * @param transactionType - The type of inventory stock transaction.
     * @param reason - The reason for the update.
     * @param referenceId - The reference ID for the transaction.
     * @param serialNumber - Optional serial number for the transaction.
     * @param transactionManager - Optional EntityManager for transaction management.
     * @throws FlierlyException if any validation fails or if an error occurs during the transaction.
     */
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

    /**
     * Updates the defective stock for a product in a branch.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param quantity - The quantity to update.
     * @param updateType - The type of update ("add" or "remove").
     * @param transactionType - The type of inventory stock transaction.
     * @param reason - The reason for the update.
     * @param referenceId - The reference ID for the transaction.
     * @param serialNumber - Optional serial number for the transaction.
     * @param transactionManager - Optional EntityManager for transaction management.
     * @throws FlierlyException if any validation fails or if an error occurs during the transaction.
     */
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

    /**
     * Updates the on-hand stock for a product in a branch.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param quantity - The quantity to update.
     * @param updateType - The type of update ("add" or "remove").
     * @param transactionType - The type of inventory stock transaction.
     * @param reason - The reason for the update.
     * @param referenceId - The reference ID for the transaction.
     * @param serialNumber - Optional serial number for the transaction.
     * @param transactionManager - Optional EntityManager for transaction management.
     * @throws FlierlyException if any validation fails or if an error occurs during the transaction.
     */
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

    /**
     * Initializes the stock for a product in a branch.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param entityManager - Optional EntityManager for transaction management.
     * @returns The created ProductStock entity.
     * @throws FlierlyException if the product is not found or if an error occurs during initialization.
     */
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

    /**
     * Validates the consistency of stock values.
     * @param productStock - The ProductStock entity to validate.
     * @throws FlierlyException if the stock values are inconsistent.
     */
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