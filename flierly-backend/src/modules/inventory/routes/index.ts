import { Router } from "express";
import productRoutes from "./product.routes";
import brandRoutes from "./brand.routes";
import productCategoryRoutes from "./product-category.routes";
import productSubCategoryRoutes from "./product-sub-category.routes";
import uomRoutes from "./uom.routes";
import ProductStockController from "../controllers/product-stock-controller/ProductStockController";
import iocContainer from "@/lib/di-ioc-container";
import InventoryModuleBeanTypes from "../ioc-config/bean.types";
import productStockRoutes from "./product-stock.routes";


const inventoryModuleRoutes = Router();

const productStockController: ProductStockController = iocContainer.get(InventoryModuleBeanTypes.ProductStockController);

inventoryModuleRoutes.use("/product", productRoutes);
inventoryModuleRoutes.use("/brand", brandRoutes);
inventoryModuleRoutes.use("/uom", uomRoutes);
inventoryModuleRoutes.use("/product-category", productCategoryRoutes);
inventoryModuleRoutes.use("/product-sub-category", productSubCategoryRoutes);
inventoryModuleRoutes.use("/product-stock", productStockRoutes);

export default inventoryModuleRoutes;