import { InventoryLedgerStockType } from "../constants/inventory-ledger-stock-type.enum";

export interface AdjustStockRequestBody {
    productId: number,
    branchId: number,
    stockType: InventoryLedgerStockType,
    quantity: number,
}