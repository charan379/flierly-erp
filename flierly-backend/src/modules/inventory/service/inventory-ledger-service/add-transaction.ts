import { AppDataSource } from "@/lib/typeorm/app-datasource";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import { InventoryLedgerTransactionType } from "../../constants/inventory-ledger-transaction-type.enum";
import InventoryLedger from "../../entities/InventoryLedger.entity";

const addInventoryTranaction = async (productId: number, quantity: number, stockAdjustType: InventoryLedgerStockType, transactionType: InventoryLedgerTransactionType, reason: string, referenceId?: string) => {
    try {
        const inventoryLedgerRepository = AppDataSource.getRepository(InventoryLedger);

        const inventoryLedger = inventoryLedgerRepository.create({
            product: { id: productId },
            description: `Stock adjustment of ${quantity} ${stockAdjustType} items`,
            quantity: quantity,
            stockType: stockAdjustType,
            transactionType: InventoryLedgerTransactionType.INVENTORY_ADJUSTMENT,
        })

        await inventoryLedgerRepository.save(inventoryLedger);

    } catch (error) {
        throw error;
    }
};

export default addInventoryTranaction;