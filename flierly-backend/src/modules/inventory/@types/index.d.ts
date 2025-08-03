interface InventoryStatistics {
    inventoryType: "available" | "deactivate" | "reserved" | "onhand" | "onorder" | "sold" | "damaged" | "return" | "work_in_progress" | "others";
    branchId?: number;
    productId?: number;
    inventoriesCount: number;
    productsCount: number;
    stockBalance: number;
}