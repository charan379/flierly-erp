import { InventoryLedgerStockType } from "../constants/inventory-ledger-stock-type.enum";

export interface AdjustStockRequestBody {
    productId: number,
    stockAdjustType: InventoryLedgerStockType,
    quantity: number,
}