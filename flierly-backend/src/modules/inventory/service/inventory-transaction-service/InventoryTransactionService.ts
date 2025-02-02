import { EntityManager } from "typeorm";
import InventoryTransaction from "../../entities/InventoryTransaction.entity";

export default interface InventoryTransactionService {

    logInventoryTransaction(transaction: Partial<InventoryTransaction>, entityManager?: EntityManager): Promise<InventoryTransaction>;
    rollbackInventoryTransaction(transactionId: number, entityManager?: EntityManager): Promise<InventoryTransaction>;

};