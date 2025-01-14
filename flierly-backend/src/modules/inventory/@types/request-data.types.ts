import { InventoryStockType } from "../constants/inventory-stock-type.enum";

export interface AdjustStockRequestBody {
    productId: number,
    branchId: number,
    stockType: InventoryStockType,
    quantity: number,
    serialNumber?: string,
}