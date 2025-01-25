import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductStock from "../entities/ProductStock.entity";
import InventoryModuleBeanTypes from "../ioc-config/bean.types";
import ProductStockController from "../controllers/product-stock-controller/ProductStockController";
import iocContainer from "@/lib/di-ioc-container";

const productStockRoutes = Router();

const crudController = CRUDController(ProductStock);

const productStockController: ProductStockController = iocContainer.get(InventoryModuleBeanTypes.ProductStockController);

// crud routes
productStockRoutes.post(`/read`, authorize(`product-stock.read`), crudController.read);
productStockRoutes.post(`/search`, authorize(`product-stock.read`), crudController.search);
productStockRoutes.post(`/is-exists`, authorize(`product-stock.read`), crudController.isExists);
productStockRoutes.post(`/page`, authorize(`product-stock.read`), crudController.page);
productStockRoutes.patch("/update-defective", authorize(`product-stock.manage`), productStockController.updateDefective.bind(productStockController));
productStockRoutes.patch("/update-on-hand", authorize(`product-stock.manage`), productStockController.updateOnHand.bind(productStockController));
productStockRoutes.patch("/update-on-order", authorize(`product-stock.manage`), productStockController.updateOnOrder.bind(productStockController));
productStockRoutes.patch("/update-reserve", authorize(`product-stock.manage`), productStockController.updateReserve.bind(productStockController));


export default productStockRoutes;