import { ContainerModule } from "inversify";
import InventoryLedgerService from "../service/inventory-ledger-service/InventoryLedgerService";
import InventoryModuleBeanTypes from "./bean.types";
import InventoryLedgerServiceImpl from "../service/inventory-ledger-service/InventoryLedgerServiceImpl";

const InventoryModuleBeans = new ContainerModule((bind) => {
    bind<InventoryLedgerService>(InventoryModuleBeanTypes.InventoryLedgerService).to(InventoryLedgerServiceImpl).inSingletonScope();
});

export default InventoryModuleBeans;