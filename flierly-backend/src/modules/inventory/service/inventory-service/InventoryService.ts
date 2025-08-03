import { EntityManager } from "typeorm";
import { InventoryType } from "../../constants/inventory-type.enum";
import Inventory from "../../entities/Inventory.entity";
import { InventoryTransactionType } from "../../constants/inventory-transaction-type.enum";


export default interface InventoryService {

    /**
     * Creates new inventory entity
     * @param inventory 
     * @param entityManager 
     */
    createInventory(inventory: Partial<Inventory>): Promise<Partial<Inventory>>;

    /**
     * Update inventory 
     * @param inventoryId
     * @param update
     */
    updateInventory(inventoryId: number, update: Partial<Inventory>): Promise<Partial<Inventory>>;

    statistics(req: { byBranch?: number, byProduct?: number }): Promise<any>;
}