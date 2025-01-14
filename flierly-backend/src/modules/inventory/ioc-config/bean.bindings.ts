import { ContainerModule } from "inversify";
import InventoryLedgerService from "../service/inventory-ledger-service/InventoryLedgerService";
import InventoryModuleBeanTypes from "./bean.types";
import InventoryLedgerServiceImpl from "../service/inventory-ledger-service/InventoryLedgerServiceImpl";
import ProductService from "../service/product-service/ProductService";
import ProductServiceImpl from "../service/product-service/ProductServiceImpl";
import ProductStockService from "../service/product-stock-service/ProductStockService";
import ProductStockServiceImpl from "../service/product-stock-service/ProductStockServiceImpl";
import ProductStockController from "../controllers/product-stock-controller/ProductStockController";
import ProductStockControllerImpl from "../controllers/product-stock-controller/ProductStockControllerImpl";
import ProductController from "../controllers/product-controller/ProductController";
import ProductControllerImpl from "../controllers/product-controller/ProductControllerImpl";
import SerializedProductService from "../service/serialized-product-service/SerializedProductService";
import SerializedProductServiceImpl from "../service/serialized-product-service/SerializedProductServiceImpl";

const InventoryModuleBeans = new ContainerModule((bind) => {
    bind<InventoryLedgerService>(InventoryModuleBeanTypes.InventoryLedgerService).to(InventoryLedgerServiceImpl).inSingletonScope();
    bind<ProductService>(InventoryModuleBeanTypes.ProductService).to(ProductServiceImpl).inSingletonScope();
    bind<ProductController>(InventoryModuleBeanTypes.ProductController).to(ProductControllerImpl).inSingletonScope();
    bind<ProductStockService>(InventoryModuleBeanTypes.ProductStockService).to(ProductStockServiceImpl).inSingletonScope();
    bind<ProductStockController>(InventoryModuleBeanTypes.ProductStockController).to(ProductStockControllerImpl).inSingletonScope();
    bind<SerializedProductService>(InventoryModuleBeanTypes.SerializedProductService).to(SerializedProductServiceImpl).inSingletonScope();
});

export default InventoryModuleBeans;