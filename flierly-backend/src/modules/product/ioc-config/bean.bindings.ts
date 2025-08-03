import { ContainerModule } from "inversify";
import ProductService from "../service/product-service/ProductService";
import ProductServiceImpl from "../service/product-service/ProductServiceImpl";
import ProductController from "../controller/product-controller/ProductController";
import ProductControllerImpl from "../controller/product-controller/ProductControllerImpl";
import ProductModuleBeanTypes from "./bean.types";
import ProductStockService from "../service/product-stock-service/ProductStockService";
import ProductStockServiceImpl from "../service/product-stock-service/ProductStockServiceImpl";
import ProductStockController from "../controller/product-stock-controller/ProductStockController";
import ProductStockControllerImpl from "../controller/product-stock-controller/ProductStockControllerImpl";

const ProductModuleBeans = new ContainerModule((bind) => {

    bind<ProductService>(ProductModuleBeanTypes.ProductService).to(ProductServiceImpl).inSingletonScope();
    bind<ProductController>(ProductModuleBeanTypes.ProductController).to(ProductControllerImpl).inSingletonScope();
    bind<ProductStockService>(ProductModuleBeanTypes.ProductStockService).to(ProductStockServiceImpl).inSingletonScope();
    bind<ProductStockController>(ProductModuleBeanTypes.ProductStockController).to(ProductStockControllerImpl).inSingletonScope();

});

export default ProductModuleBeans;