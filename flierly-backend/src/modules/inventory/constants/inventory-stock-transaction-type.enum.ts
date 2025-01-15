/**
 * Inventory Stock Transaction Type Enum
 */
export enum InventoryStockTransactionType {
    STOCK_ADJUSTMENT = 'stock_adjustment',
    SALES_ORDER = 'sales_order',
    PURCHASE_ORDER = 'purchase_order',
    SALES_RETURN_OK = 'sales_return_ok',
    PURCHASE_RETURN_OK = 'purchase_return_ok',
    PURCHASE_RETURN_DEFECTIVE = 'purchase_return_defective',
    SALES_RETURN_DEFECTIVE = 'sales_return_defective',
    SALES_INVOICE = 'sales_invoice', // Fixed typo
    PURCHASE_INVOICE = 'purchase_invoice',
    TRANSFER_OUT = 'transfer_out',
    TRANSFER_IN = 'transfer_in',
    STOCK_DISPOSAL = 'stock_disposal',
}