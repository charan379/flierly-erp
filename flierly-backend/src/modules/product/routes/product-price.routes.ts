import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import ProductPrice from "../entities/ProductPrice.entity";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";

const crudController = CRUDController(ProductPrice);
const productPriceRoutes = Router();

// crud routes
productPriceRoutes.post(`/create`, requestValidator(ProductPrice, "body"), authorize(`product-price.create`), crudController.create);
productPriceRoutes.post(`/read`, authorize(`product-price.read`), crudController.read);
productPriceRoutes.post(`/search`, authorize(`product-price.read`), crudController.search);
productPriceRoutes.post(`/page`, authorize(`product-price.read`), crudController.page);

export default productPriceRoutes;