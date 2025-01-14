import { InventoryStockType } from "../../constants/inventory-stock-type.enum";
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";

interface InventoryLedgerService {
    /**
     * Basic transaction with required fields.
     */
    newTransaction(
        productId: number,
        branchId: number,
        quantity: number,
        stockType: InventoryStockType,
        serialNumber?: string
    ): Promise<void>;

    /**
     * Detailed transaction with additional metadata.
     */
    newTransaction(
        productId: number,
        branchId: number,
        quantity: number,
        stockType: InventoryStockType,
        serialNumber?: string,
        transactionType?: InventoryStockTransactionType,
        reason?: string,
        referenceId?: string
    ): Promise<void>;
}

export default InventoryLedgerService;
