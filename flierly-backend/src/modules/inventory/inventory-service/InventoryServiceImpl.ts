import { EntityManager } from "typeorm";
import { InventoryTransactionType } from "../constants/inventory-transaction-type.enum";
import { InventoryType } from "../constants/inventory-type.enum";
import Inventory from "../entities/Inventory.entity";
import InventoryService from "./InventoryService";
import { injectable } from "inversify";

@injectable()
export default class InventoryServiceImpl implements InventoryService {

    createInventory(inventory: Partial<Inventory>): Promise<Partial<Inventory>> {
        throw new Error("Method not implemented.");
    };

    transferStockIntraBranch(sourceInventoryId: number, destinationInventoryId: number, branchId: number, productId: number, quantity: number, transactionType: InventoryTransactionType, costPerUnit: number, transactionManager?: EntityManager): Promise<void> {
        throw new Error("Method not implemented.");
    };

    transferStockInterBranch(sourceBranchId: number, sourceBranchInventoryId: number, destinationBranchId: number, destinationBranchInventoryId: number, productId: number, quantity: number, transactionType: InventoryTransactionType, costPerUnit: number, transactionManager?: EntityManager): Promise<void> {
        throw new Error("Method not implemented.");
    };

}