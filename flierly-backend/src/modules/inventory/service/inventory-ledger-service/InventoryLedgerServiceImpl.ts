import { Repository } from "typeorm";
import InventoryLedgerService from "./InventoryLedgerService";
import InventoryLedger from "../../entities/InventoryLedger.entity";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import { InventoryLedgerTransactionType } from "../../constants/inventory-ledger-transaction-type.enum";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";

@injectable()
class InventoryLedgerServiceImpl implements InventoryLedgerService {

    private readonly inventoryLedgerRepository: Repository<InventoryLedger>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService
    ) {
        this.inventoryLedgerRepository = this.databaseService.getRepository(InventoryLedger);
    }

    async newTransaction(productId: number, branchId: number, quantity: number, stockType: InventoryLedgerStockType): Promise<void>;
    async newTransaction(productId: number, branchId: number, quantity: number, stockType: InventoryLedgerStockType, transactionType: InventoryLedgerTransactionType, reason: string, referenceId: string): Promise<void>;
    async newTransaction(productId: number, branchId: number, quantity: number, stockType: InventoryLedgerStockType, transactionType?: InventoryLedgerTransactionType, reason?: string, referenceId?: string): Promise<void> {
        try {
            const transaction = this.inventoryLedgerRepository.create({
                product: { id: productId },
                branch: { id: branchId },
                stockType: stockType,
                quantity: quantity,
                transactionType: transactionType ?? InventoryLedgerTransactionType.STOCK_ADJUSTMENT,
                description: reason ?? `Stock adjustment of ${quantity} for ${stockType} items`,
                referenceId: referenceId,
            });
            await validateEntityInstance(transaction);
            await this.inventoryLedgerRepository.save(transaction);
        } catch (error) {
            throw error;
        }
    }
};

export default InventoryLedgerServiceImpl;