import { EntityManager } from "typeorm";
import { InventoryType } from "../constants/inventory-type.enum";
import Inventory from "../entities/Inventory.entity";
import { InventoryTransactionType } from "../constants/inventory-transaction-type.enum";


export default interface InventoryService {
    // intialize inventory
    createInventory(inventory: Partial<Inventory>): Promise<Partial<Inventory>>;
    // transferStock between accounts within same branch
    transferStockIntraBranch(
        sourceInventoryId: number,
        destinationInventoryId: number,
        branchId: number,
        productId: number,
        quantity: number,
        transactionType: InventoryTransactionType,
        costPerUnit: number,
        transactionManager?: EntityManager
    ): Promise<void>;
    // transferStock between accounts within different branches
    transferStockInterBranch(
        sourceBranchId: number,
        sourceBranchInventoryId: number,
        destinationBranchId: number,
        destinationBranchInventoryId: number,
        productId: number,
        quantity: number,
        transactionType: InventoryTransactionType,
        costPerUnit: number,
        transactionManager?: EntityManager
    ): Promise<void>;
}