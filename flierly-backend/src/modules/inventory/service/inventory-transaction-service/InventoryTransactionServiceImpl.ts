import { inject, injectable } from "inversify";
import InventoryTransactionService from "./InventoryTransactionService";
import { EntityManager } from "typeorm";
import InventoryTransaction from "../../entities/InventoryTransaction.entity";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";


@injectable()
export default class InventoryTransactionServiceImpl implements InventoryTransactionService {

    constructor(
        @inject(BeanTypes.DatabaseService) private databaseService: DatabaseService,
        @inject(BeanTypes.LoggerService) private loggerService: LoggerService,
    ) {

    }

    async logInventoryTransaction(transaction: Partial<InventoryTransaction>, entityManager?: EntityManager): Promise<InventoryTransaction> {
        try {
            const InventoryTransactionRepository = entityManager ? entityManager.getRepository(InventoryTransaction) : this.databaseService.getRepository(InventoryTransaction);

            const inventoryTransaction = InventoryTransactionRepository.create(transaction);

            await validateEntityInstance(inventoryTransaction);

            return await InventoryTransactionRepository.save(inventoryTransaction);
        } catch (error) {
            throw error;
        }
    };

    rollbackInventoryTransaction(transactionId: number, entityManager?: EntityManager): Promise<InventoryTransaction> {
        throw new Error("Method not implemented.");
    }



}