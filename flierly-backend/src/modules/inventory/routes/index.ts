import { Router } from "express";
import productRoutes from "./product.routes";
import brandRoutes from "./brand.routes";
import productCategoryRoutes from "./product-category.routes";
import productSubCategoryRoutes from "./product-sub-category.routes";


const inventoryModuleRoutes = Router();

inventoryModuleRoutes.use("/product", productRoutes);
inventoryModuleRoutes.use("/brand", brandRoutes);
inventoryModuleRoutes.use("/product-category", productCategoryRoutes);
inventoryModuleRoutes.use("/product-sub-category", productSubCategoryRoutes);

export default inventoryModuleRoutes;