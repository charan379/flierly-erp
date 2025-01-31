import { ContainerModule } from "inversify";
import ProductService from "../service/product-service/ProductService";
import ProductServiceImpl from "../service/product-service/ProductServiceImpl";
import ProductController from "../controller/product-controller/ProductController";
import ProductControllerImpl from "../controller/product-controller/ProductControllerImpl";
import ProductModuleBeanTypes from "./bean.types";

const ProductModuleBeans = new ContainerModule((bind) => {
    bind<ProductService>(ProductModuleBeanTypes.ProductService).to(ProductServiceImpl).inSingletonScope();
    bind<ProductController>(ProductModuleBeanTypes.ProductController).to(ProductControllerImpl).inSingletonScope();
});

export default ProductModuleBeans;