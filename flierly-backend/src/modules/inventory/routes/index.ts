import { Router } from "express";
import productRoutes from "./product.routes";
import brandRoutes from "./brand.routes";
import productCategoryRoutes from "./product-category.routes";
import productSubCategoryRoutes from "./product-sub-category.routes";
import uomRoutes from "./uom.routes";
import productStockRoutes from "./product-stock.routes";
import productPriceRoutes from "./product-price.routes";


const inventoryModuleRoutes = Router();

inventoryModuleRoutes.use("/product", productRoutes);
inventoryModuleRoutes.use("/brand", brandRoutes);
inventoryModuleRoutes.use("/uom", uomRoutes);
inventoryModuleRoutes.use("/product-category", productCategoryRoutes);
inventoryModuleRoutes.use("/product-sub-category", productSubCategoryRoutes);
inventoryModuleRoutes.use("/product-stock", productStockRoutes);
inventoryModuleRoutes.use("/product-price", productPriceRoutes);

export default inventoryModuleRoutes;