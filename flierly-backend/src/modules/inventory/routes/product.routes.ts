import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import Product from "../entities/Product.entity";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import productController from "../controllers/product-controller";


const productRoutes = Router();

const crudController = CRUDController(Product);

// crud routes
productRoutes.post(`/create`, requestValidator(Product, "body"), authorize(`product.create`), productController.create);
productRoutes.patch(`/adjust-stock`, productController.adjustStock);
productRoutes.post(`/read`, authorize(`product.read`), crudController.read);
productRoutes.post(`/search`, authorize(`product.read`), crudController.search);
productRoutes.post(`/is-exists`, authorize(`product.read`), crudController.isExists);
productRoutes.post(`/page`, authorize(`product.read`), crudController.page);
productRoutes.put(`/update/:id`, requestValidator(Product, "body"), authorize(`product.update`), crudController.update);
productRoutes.patch(`/activate`, authorize(`product.manage`), crudController.activate);
productRoutes.patch(`/inactivate`, authorize(`product.manage`), crudController.inactivate);
productRoutes.delete(`/delete`, authorize(`product.delete`), crudController.delete);
productRoutes.patch(`/restore`, authorize(`product.delete`), crudController.restore);

export default productRoutes;