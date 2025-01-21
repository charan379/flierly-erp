import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { InventoryStockType } from "../constants/inventory-stock-type.enum";

export interface AdjustStockRequestBody {
    productId: number,
    branchId: number,
    stockType: InventoryStockType,
    quantity: number,
    serialNumber?: string,
};

export interface UpdateDefectiveRequestBody {
    productId: number;
    branchId: number;
    quantity: number;
    updateType: "add" | "remove";
    transactionType: InventoryStockTransactionType.SALES_RETURN_DEFECTIVE |
    InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE |
    InventoryStockTransactionType.MANUAL_ADJUSTMENT;
    reason: string;
    referenceId: string;
    serialNumber?: string;
}

export interface UpdateOnHandRequestBody {
    productId: number;
    branchId: number;
    quantity: number;
    updateType: "add" | "remove";
    transactionType: InventoryStockTransactionType.TRANSFER_IN |
    InventoryStockTransactionType.TRANSFER_OUT |
    InventoryStockTransactionType.MANUAL_ADJUSTMENT |
    InventoryStockTransactionType.PURCHASE_INVOICE |
    InventoryStockTransactionType.PURCHASE_RETURN_OK |
    InventoryStockTransactionType.SALES_RETURN_OK |
    InventoryStockTransactionType.SALES_INVOICE |
    InventoryStockTransactionType.STOCK_DISPOSAL;
    reason: string;
    referenceId: string;
    serialNumber?: string;
}