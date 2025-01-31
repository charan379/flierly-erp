import { ContainerModule } from "inversify";
import InventoryModuleBeanTypes from "./bean.types";
import InventoryService from "../inventory-service/InventoryService";
import InventoryServiceImpl from "../inventory-service/InventoryServiceImpl";
import InventoryTransactionService from "../inventory-transaction-service/InventoryTransactionService";
import InventoryTransactionServiceImpl from "../inventory-transaction-service/InventoryTransactionServiceImpl";

const InventoryModuleBeans = new ContainerModule((bind) => {
    bind<InventoryService>(InventoryModuleBeanTypes.InventoryService).to(InventoryServiceImpl).inSingletonScope();
    bind<InventoryTransactionService>(InventoryModuleBeanTypes.InventoryTransactionService).to(InventoryTransactionServiceImpl).inSingletonScope();
});

export default InventoryModuleBeans;