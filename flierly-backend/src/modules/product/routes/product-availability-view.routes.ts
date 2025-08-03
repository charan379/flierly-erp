import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductAvailabilityView from "../entities/ProductAvailabilityView.entity";


const productAvailabilityViewRoutes = Router();

const crudController = CRUDController(ProductAvailabilityView);

// crud routes
productAvailabilityViewRoutes.post(`/read`, authorize(`product-availability-view.read`), crudController.read);
productAvailabilityViewRoutes.post(`/search`, authorize(`product-availability-view.read`), crudController.search);
productAvailabilityViewRoutes.post(`/is-exists`, authorize(`product-availability-view.read`), crudController.isExists);
productAvailabilityViewRoutes.post(`/page`, authorize(`product-availability-view.read`), crudController.page);

export default productAvailabilityViewRoutes;