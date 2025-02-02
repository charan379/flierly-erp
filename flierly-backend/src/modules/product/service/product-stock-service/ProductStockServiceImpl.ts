import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import ProductStockService from "./ProductStockService";
import { injectable, inject } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { ProductStockOperationType } from "../../constants/product-stock-operation-type.enum";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import Inventory from "@/modules/inventory/entities/Inventory.entity";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import { InventoryTransactionType } from "@/modules/inventory/constants/inventory-transaction-type.enum";
import InventoryTransactionService from "@/modules/inventory/service/inventory-transaction-service/InventoryTransactionService";
import InventoryService from "@/modules/inventory/service/inventory-service/InventoryService";
import { InventoryEntryType } from "@/modules/inventory/constants/inventory-entry-type.enum";
import TransferStockIntraBranchDTO from "../../dto/TransferStockIntraBranch.dto";

@injectable()
export default class ProductStockServiceImpl implements ProductStockService {

    constructor(
        @inject(BeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(BeanTypes.InventoryTransactionService) private readonly inventoryTransactionService: InventoryTransactionService,
    ) {

    };

    async createProductStock(productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<ProductStock> {
        try {
            const productStockRepository = entityManager?.getRepository(ProductStock) || this.databaseService.getRepository(ProductStock);

            const newProductStock = productStockRepository.create(productStock);

            await validateEntityInstance(newProductStock);

            return await productStockRepository.save(newProductStock);

        } catch (error) {
            throw error;
        }
    };


    async updateProductStockBalance(productId: number, inventoryId: number, quantity: number, operation: ProductStockOperationType, entityManager?: EntityManager): Promise<Partial<ProductStock>> {
        try {

            const productStockRepository = entityManager?.getRepository(ProductStock) || this.databaseService.getRepository(ProductStock);

            let productStock = await productStockRepository.findOne({ where: { productId, inventoryId } });

            if (!productStock) {
                productStock = await this.createProductStock({ productId, inventoryId, balance: 0 }, entityManager);
            };

            if (operation === ProductStockOperationType.ADD) {
                productStock.balance += quantity;
            } else {
                productStock.balance -= quantity;
            };

            // if (productStock.balance < 0) {
            //     throw new FlierlyException("Insufficient stock", HttpCodes.BAD_REQUEST, JSON.stringify({ productId, inventoryId, quantity, operation }));
            // };
            await validateEntityInstance(productStock);
            
            return await productStockRepository.save(productStock);

        } catch (error) {
            throw error;
        }
    };


    async updateProductStock(productStockId: number, productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<Partial<ProductStock>> {
        try {
            const productStockRepository = entityManager?.getRepository(ProductStock) || this.databaseService.getRepository(ProductStock);

            const existingProductStock = await productStockRepository.findOne({ where: { id: productStockId } });

            if (!existingProductStock) {
                throw new Error("Product stock not found");
            }

            delete productStock.id;
            delete productStock.balance;

            const updatedProductStock = productStockRepository.merge(existingProductStock, productStock);

            await validateEntityInstance(updatedProductStock);

            return await productStockRepository.save(updatedProductStock);
        } catch (error) {
            throw error;
        }
    };

    async transferStockIntraBranch(transferStockIntraBranchDTO: TransferStockIntraBranchDTO, entityManager?: EntityManager): Promise<void> {
        try {
            const { branchId, costPerUnit, destinationInventoryId, productId, productSerialNumber, quantity, referenceDocType, remarks, sourceInventoryId, transactionType, referenceDocId } = transferStockIntraBranchDTO;

            const executeTransfer = async (manager: EntityManager) => {
                const sourceInventory = await manager.getRepository(Inventory).findOne({ where: { id: sourceInventoryId, branchId } });
                const destinationInventory = await manager.getRepository(Inventory).findOne({ where: { id: destinationInventoryId, branchId } });

                if (!sourceInventory) {
                    throw new FlierlyException("Source inventory not found", HttpCodes.BAD_REQUEST, JSON.stringify({ sourceInventoryId, branchId }));
                };

                if (!destinationInventory) {
                    throw new FlierlyException("Destination inventory not found", HttpCodes.BAD_REQUEST, JSON.stringify({ destinationInventoryId, branchId }));
                };

                await this.updateProductStockBalance(productId, sourceInventoryId, quantity, ProductStockOperationType.REMOVE, manager);

                await this.inventoryTransactionService.logInventoryTransaction(
                    {
                        costPerUnit,
                        entryType: InventoryEntryType.DEBIT,
                        productSerialNumber,
                        quantity,
                        referenceDocId,
                        referenceDocType,
                        remarks,
                        transactionType,
                        inventoryId: sourceInventoryId
                    }
                    , manager
                )

                await this.updateProductStockBalance(productId, destinationInventoryId, quantity, ProductStockOperationType.ADD, manager);

                await this.inventoryTransactionService.logInventoryTransaction(
                    {
                        costPerUnit,
                        entryType: InventoryEntryType.CREDIT,
                        productSerialNumber,
                        quantity,
                        referenceDocId,
                        referenceDocType,
                        remarks,
                        transactionType,
                        inventoryId: destinationInventoryId,
                    }
                    , manager
                )
            }

            if (entityManager) {
                await executeTransfer(entityManager);
            } else {
                await this.databaseService.executeTransaction(async entityManager => {
                    await executeTransfer(entityManager);
                })
            };

        } catch (error) {
            throw error;
        }
    };

    async transferStockInterBranch(sourceBranchId: number, sourceBranchInventoryId: number, destinationBranchId: number, destinationBranchInventoryId: number, productId: number, quantity: number, transactionType: InventoryTransactionType, costPerUnit: number, entityManager?: EntityManager): Promise<void> {
        throw new Error("Method not implemented.");
    }

}