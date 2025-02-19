type InventoryType = "available" | "deactivate" | "reserved" | "onhand" | "onorder" | "sold" | "damaged" | "return" | "work_in_progress" | "others";

interface Inventory extends EntityTimeStamps {
    id: number;
    name: string;
    inventoryType: InventoryType;
    branch?: Branch;
    branchId: number;
    remarks: string;
}