import { Router } from "express";
import productRoutes from "./product.routes";
import brandRoutes from "../../brand/routes/brand.routes";
import productCategoryRoutes from "./product-category.routes";
import productSubCategoryRoutes from "./product-sub-category.routes";
import uomRoutes from "../../uom/routes/uom.routes";
import productStockRoutes from "./product-stock.routes";
import productPriceRoutes from "./product-price.routes";
import productLatestPricesViewRoutes from "./product-latest-prices-view.routes";
import productAvailabilityViewRoutes from "./product-availability-view.routes";


const productModuleRoutes = Router();

productModuleRoutes.use("/product", productRoutes);
productModuleRoutes.use("/product-category", productCategoryRoutes);
productModuleRoutes.use("/product-sub-category", productSubCategoryRoutes);
productModuleRoutes.use("/product-stock", productStockRoutes);
productModuleRoutes.use("/product-price", productPriceRoutes);
productModuleRoutes.use("/product-latest-prices-view", productLatestPricesViewRoutes);
productModuleRoutes.use("/product-availability-view", productAvailabilityViewRoutes);


export default productModuleRoutes;