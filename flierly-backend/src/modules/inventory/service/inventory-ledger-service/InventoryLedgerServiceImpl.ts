import { Repository } from "typeorm";
import InventoryLedgerService from "./InventoryLedgerService";
import InventoryLedger from "../../entities/InventoryLedger.entity";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import { InventoryStockType } from "../../constants/inventory-stock-type.enum";
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";

@injectable()
class InventoryLedgerServiceImpl implements InventoryLedgerService {
    private readonly inventoryLedgerRepository: Repository<InventoryLedger>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService
    ) {
        this.inventoryLedgerRepository = this.databaseService.getRepository(InventoryLedger);
    }

    async newTransaction(
        productId: number,
        branchId: number,
        quantity: number,
        stockType: InventoryStockType,
        serialNumber?: string,
        transactionType: InventoryStockTransactionType = InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string = `Stock adjustment of ${quantity} for ${stockType} items`,
        referenceId?: string
    ): Promise<void> {
        try {
            // Create the inventory ledger entry
            const transaction = this.inventoryLedgerRepository.create({
                product: { id: productId },
                branch: { id: branchId },
                stockType,
                quantity,
                transactionType,
                description: reason,
                referenceId,
                productSerialNumber: serialNumber,
            });

            // Validate the created entity instance
            await validateEntityInstance(transaction);

            // Save the ledger entry
            await this.inventoryLedgerRepository.save(transaction);
        } catch (error) {
            throw new FlierlyException(`Failed to create inventory ledger transaction: ${(error as Error).message}`, HttpCodes.BAD_REQUEST, JSON.stringify(error));
        }
    }
}

export default InventoryLedgerServiceImpl;
