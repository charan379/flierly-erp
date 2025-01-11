import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import { InventoryLedgerTransactionType } from "../../constants/inventory-ledger-transaction-type.enum";

interface InventoryLedgerService {
    newTransaction(productId: number, quantity: number, stockType: InventoryLedgerStockType): Promise<void>;
    newTransaction(productId: number, quantity: number, stockType: InventoryLedgerStockType, transactionType: InventoryLedgerTransactionType, reason: string, referenceId: string): Promise<void>;
};

export default InventoryLedgerService;