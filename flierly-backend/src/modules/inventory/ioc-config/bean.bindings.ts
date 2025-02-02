import { ContainerModule } from "inversify";
import InventoryModuleBeanTypes from "./bean.types";
import InventoryService from "../service/inventory-service/InventoryService";
import InventoryServiceImpl from "../service/inventory-service/InventoryServiceImpl";
import InventoryTransactionService from "../service/inventory-transaction-service/InventoryTransactionService";
import InventoryTransactionServiceImpl from "../service/inventory-transaction-service/InventoryTransactionServiceImpl";

const InventoryModuleBeans = new ContainerModule((bind) => {
    bind<InventoryService>(InventoryModuleBeanTypes.InventoryService).to(InventoryServiceImpl).inSingletonScope();
    bind<InventoryTransactionService>(InventoryModuleBeanTypes.InventoryTransactionService).to(InventoryTransactionServiceImpl).inSingletonScope();
});

export default InventoryModuleBeans;