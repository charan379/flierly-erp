import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import { ProductStockOperationType } from "../../constants/product-stock-operation-type.enum";
import { InventoryTransactionType } from "@/modules/inventory/constants/inventory-transaction-type.enum";

export default interface ProductStockService {
    /**
     * Creates a new product stock entity
     * @param productStock 
     * @param entityManager
     */
    createProductStock(productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<ProductStock>;

    /**
     * Update product stock balance
     * @param productId 
     * @param inventoryId 
     * @param quantity 
     * @param operation 
     * @param entityManager
     */
    updateProductStockBalance(productId: number, inventoryId: number, quantity: number, operation: ProductStockOperationType, entityManager?: EntityManager): Promise<Partial<ProductStock>>;

    /**
     * Updates product stock entity
     * @param productStockId
     * @param productStock 
     * @param entityManager
     */
    updateProductStock(productStockId: number, productStock: Partial<ProductStock>, entityManager?: EntityManager): Promise<Partial<ProductStock>>;

    /**
     * Transfer Stock between accounts within same branch
     * @param sourceInventoryId 
     * @param destinationInventoryId 
     * @param branchId 
     * @param productId 
     * @param quantity 
     * @param transactionType 
     * @param costPerUnit 
     * @param entityManager 
     */
    transferStockIntraBranch(
        sourceInventoryId: number,
        destinationInventoryId: number,
        branchId: number,
        productId: number,
        quantity: number,
        transactionType: InventoryTransactionType,
        costPerUnit: number,
        entityManager?: EntityManager
    ): Promise<void>;

    /**
     * Transfer Stock between accounts within different branches
     * @param sourceBranchId 
     * @param sourceBranchInventoryId 
     * @param destinationBranchId 
     * @param destinationBranchInventoryId 
     * @param productId 
     * @param quantity 
     * @param transactionType 
     * @param costPerUnit 
     * @param entityManager 
     */
    transferStockInterBranch(
        sourceBranchId: number,
        sourceBranchInventoryId: number,
        destinationBranchId: number,
        destinationBranchInventoryId: number,
        productId: number,
        quantity: number,
        transactionType: InventoryTransactionType,
        costPerUnit: number,
        entityManager?: EntityManager
    ): Promise<void>;
}