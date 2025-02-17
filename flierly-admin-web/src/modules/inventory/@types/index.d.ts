type InventoryType = "available" | "deactivate" | "reserved" | "onhand" | "onorder" | "sold" | "damaged" | "return" | "work_in_progress" | "others";

interface Inventory extends EntityTimeStamps {
    id: number;
    name: string;
    inventoryType: InventoryType;
    branch?: Branch;
    branchId: number;
    remarks: string;
}

interface UOM extends EntityTimeStamps {
    id: number;
    name: string;
    shortName: string;
}

interface UOMConverstion extends EntityTimeStamps {
    id: number;
    product?: Product;
    productId: number;
    fromUom?: UOM;
    fromUomId: number;
    toUom?: UOM;
    toUomId: number;
    conversionFactor: number;
    description: string;
}
