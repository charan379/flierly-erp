import { Router } from "express";
import productRoutes from "./product.routes";
import brandRoutes from "./brand.routes";
import productCategoryRoutes from "./product-category.routes";
import productSubCategoryRoutes from "./product-sub-category.routes";


const productModuleRoutes = Router();

productModuleRoutes.use("/product", productRoutes);
productModuleRoutes.use("/brand", brandRoutes);
productModuleRoutes.use("/product-category", productCategoryRoutes);
productModuleRoutes.use("/product-sub-category", productSubCategoryRoutes);

export default productModuleRoutes;