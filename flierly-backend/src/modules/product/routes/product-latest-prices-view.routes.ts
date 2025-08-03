import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductLatestPricesView from "../entities/ProductLatestPricesView.entity";


const productLatestPricesViewRoutes = Router();

const crudController = CRUDController(ProductLatestPricesView);

// crud routes
productLatestPricesViewRoutes.post(`/read`, authorize(`product-latest-prices-view.read`), crudController.read);
productLatestPricesViewRoutes.post(`/search`, authorize(`product-latest-prices-view.read`), crudController.search);
productLatestPricesViewRoutes.post(`/is-exists`, authorize(`product-latest-prices-view.read`), crudController.isExists);
productLatestPricesViewRoutes.post(`/page`, authorize(`product-latest-prices-view.read`), crudController.page);

export default productLatestPricesViewRoutes;