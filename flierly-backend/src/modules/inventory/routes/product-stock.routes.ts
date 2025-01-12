import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductStock from "../entities/ProductStock.entity";

const productStockRoutes = Router();

const crudController = CRUDController(ProductStock);

// crud routes
productStockRoutes.post(`/read`, authorize(`product-stock.read`), crudController.read);
productStockRoutes.post(`/search`, authorize(`product-stock.read`), crudController.search);
productStockRoutes.post(`/is-exists`, authorize(`product-stock.read`), crudController.isExists);
productStockRoutes.post(`/page`, authorize(`product-stock.read`), crudController.page);

export default productStockRoutes;