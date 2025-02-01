import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import ProductStockService from "./ProductStockService";
import { injectable, inject } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { ProductStockOperationType } from "../../constants/product-stock-operation-type.enum";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import Inventory from "@/modules/inventory/entities/Inventory.entity";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import { InventoryTransactionType } from "@/modules/inventory/constants/inventory-transaction-type.enum";

@injectable()
export default class ProductStockServiceImpl implements ProductStockService {

    constructor(
        @inject(BeanTypes.DatabaseService) private readonly DatabaseService: DatabaseService,
    ) {

    };

    async createProductStock(productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<ProductStock> {
        try {
            const productStockRepository = entityManager?.getRepository(ProductStock) || this.DatabaseService.getRepository(ProductStock);

            const newProductStock = productStockRepository.create(productStock);

            await validateEntityInstance(newProductStock);

            return await productStockRepository.save(newProductStock);

        } catch (error) {
            throw error;
        }
    };


    async updateProductStockBalance(productId: number, inventoryId: number, quantity: number, operation: ProductStockOperationType, entityManager?: EntityManager): Promise<Partial<ProductStock>> {
        try {

            const productStockRepository = entityManager?.getRepository(ProductStock) || this.DatabaseService.getRepository(ProductStock);

            const productStock = await productStockRepository.findOne({ where: { productId, inventoryId } });

            if (!productStock) {
                throw new Error("Product stock not found");
            }

            if (operation === ProductStockOperationType.ADD) {
                productStock.balance += quantity;
            } else {
                productStock.balance -= quantity;
            }

            return await productStockRepository.save(productStock);

        } catch (error) {
            throw error;
        }
    };


    async updateProductStock(productStockId: number, productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<Partial<ProductStock>> {
        try {
            const productStockRepository = entityManager?.getRepository(ProductStock) || this.DatabaseService.getRepository(ProductStock);

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

    async transferStockIntraBranch(sourceInventoryId: number, destinationInventoryId: number, branchId: number, productId: number, quantity: number, transactionType: InventoryTransactionType, costPerUnit: number, entityManager?: EntityManager): Promise<void> {
        try {
            const sourceInventory = await this.DatabaseService.getRepository(Inventory).findOne({ where: { id: sourceInventoryId, branchId } });
            const destinationInventory = await this.DatabaseService.getRepository(Inventory).findOne({ where: { id: destinationInventoryId, branchId } });

            if (!sourceInventory) {
                throw new FlierlyException("Source inventory not found", HttpCodes.BAD_REQUEST, JSON.stringify({ sourceInventoryId, branchId }));
            };

            if (!destinationInventory) {
                throw new FlierlyException("Destination inventory not found", HttpCodes.BAD_REQUEST, JSON.stringify({ destinationInventoryId, branchId }));
            };

            await this.updateProductStockBalance(productId, sourceInventoryId, quantity, ProductStockOperationType.REMOVE, entityManager);
            await this.updateProductStockBalance(productId, destinationInventoryId, quantity, ProductStockOperationType.ADD, entityManager);


        } catch (error) {
            throw error;
        }
    };

    async transferStockInterBranch(sourceBranchId: number, sourceBranchInventoryId: number, destinationBranchId: number, destinationBranchInventoryId: number, productId: number, quantity: number, transactionType: InventoryTransactionType, costPerUnit: number, entityManager?: EntityManager): Promise<void> {
        throw new Error("Method not implemented.");
    }

}