import { ContainerModule } from "inversify";
import InventoryLedgerService from "../service/inventory-ledger-service/InventoryLedgerService";
import InventoryModuleBeanTypes from "./bean.types";
import InventoryLedgerServiceImpl from "../service/inventory-ledger-service/InventoryLedgerServiceImpl";
import ProductService from "../service/product-service/ProductService";
import ProductServiceImpl from "../service/product-service/ProductServiceImpl";
import ProductStockService from "../service/product-stock-service/ProductStockService";
import ProductStockServiceImpl from "../service/product-stock-service/ProductStockServiceImpl";

const InventoryModuleBeans = new ContainerModule((bind) => {
    bind<InventoryLedgerService>(InventoryModuleBeanTypes.InventoryLedgerService).to(InventoryLedgerServiceImpl).inSingletonScope();
    bind<ProductService>(InventoryModuleBeanTypes.ProdcutService).to(ProductServiceImpl).inSingletonScope();
    bind<ProductStockService>(InventoryModuleBeanTypes.ProductStockService).to(ProductStockServiceImpl).inSingletonScope();
});

export default InventoryModuleBeans;