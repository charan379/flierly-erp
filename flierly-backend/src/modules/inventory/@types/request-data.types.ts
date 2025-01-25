import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { InventoryStockType } from "../constants/inventory-stock-type.enum";

export interface AdjustStockRequestBody {
    productId: number,
    branchId: number,
    stockType: InventoryStockType,
    quantity: number,
    serialNumber?: string,
};

export interface UpdateStockRequestBody {
    productId: number;
    branchId: number;
    quantity: number;
    updateType: "add" | "remove";
    reason: string;
    referenceId: string;
    serialNumber?: string;
}
export interface UpdateDefectiveRequestBody extends UpdateStockRequestBody {
    transactionType:
    InventoryStockTransactionType.SALES_RETURN_DEFECTIVE |
    InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE |
    InventoryStockTransactionType.MANUAL_ADJUSTMENT;
}

export interface UpdateOnHandRequestBody extends UpdateStockRequestBody {
    transactionType:
    InventoryStockTransactionType.TRANSFER_IN |
    InventoryStockTransactionType.TRANSFER_OUT |
    InventoryStockTransactionType.MANUAL_ADJUSTMENT |
    InventoryStockTransactionType.PURCHASE_INVOICE |
    InventoryStockTransactionType.PURCHASE_RETURN_OK |
    InventoryStockTransactionType.SALES_RETURN_OK |
    InventoryStockTransactionType.SALES_INVOICE |
    InventoryStockTransactionType.STOCK_DISPOSAL;
};

export interface UpdateOnHandRequestBody extends UpdateStockRequestBody {
    transactionType:
    InventoryStockTransactionType.TRANSFER_IN |
    InventoryStockTransactionType.TRANSFER_OUT |
    InventoryStockTransactionType.MANUAL_ADJUSTMENT |
    InventoryStockTransactionType.PURCHASE_INVOICE |
    InventoryStockTransactionType.PURCHASE_RETURN_OK |
    InventoryStockTransactionType.SALES_RETURN_OK |
    InventoryStockTransactionType.SALES_INVOICE |
    InventoryStockTransactionType.STOCK_DISPOSAL;
};

export interface UpdateReserveRequestBody extends UpdateStockRequestBody {
    transactionType:
    InventoryStockTransactionType.SALES_ORDER
    | InventoryStockTransactionType.MANUAL_ADJUSTMENT
    | InventoryStockTransactionType.SALES_INVOICE;
};

export interface UpdateOnOrderRequestBody extends UpdateStockRequestBody {
    transactionType:
    InventoryStockTransactionType.PURCHASE_ORDER
    | InventoryStockTransactionType.PURCHASE_INVOICE
    | InventoryStockTransactionType.MANUAL_ADJUSTMENT;
}