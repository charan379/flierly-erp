import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import { InventoryLedgerTransactionType } from "../../constants/inventory-ledger-transaction-type.enum";
import InventoryLedger from "../../entities/InventoryLedger.entity";
import iocContainer from "@/lib/di-ioc-container";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

const addInventoryTranaction = async (productId: number, quantity: number, stockAdjustType: InventoryLedgerStockType, transactionType: InventoryLedgerTransactionType, reason: string, referenceId?: string) => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        const inventoryLedgerRepository = databaseService.getRepository(InventoryLedger);

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