
const InventoryModuleBeanTypes = {
    // Inventory
    InventoryService: Symbol.for("inventoryService"),
    InventoryController: Symbol.for("inventoryController"),

    // Inventory Transaction
    InventoryTransactionService: Symbol.for("inventoryTransactionService"),
    InventoryTransactionController: Symbol.for("inventoryTransactionController"),
};

export default InventoryModuleBeanTypes;