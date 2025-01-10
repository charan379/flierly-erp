/**
 * Inventory Ledger Transaction type enum
 */
export enum InventoryLedgerTransactionType {
    INVENTORY_ADJUSTMENT = 'inventory_adjustment',
    SALES_ORDER = 'sales_order',
    PURCHASE_ORDER = 'purchase_order',
    SALES_RETURN_OK = 'sales_return_ok',
    PURCHASE_RETURN_OK = 'purchase_return_ok',
    PURCHASE_RETURN_DEFECTIVE = 'purchase_return_defective',
    SALES_RETURN_DEFECTIVE = 'sales_return_defective',
    SALES_INVOICE = 'sales_invocie',
    PURCHASE_INVOICE = 'purchase_invoice',
}