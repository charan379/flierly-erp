import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductCategory from "../entities/ProductCategory.entity";


const productCategoryRoutes = Router();

const crudController = CRUDController(ProductCategory);

// crud routes
productCategoryRoutes.post(`/create`, requestValidator(ProductCategory, "body"), authorize(`product-category.create`), crudController.create);
productCategoryRoutes.post(`/read`, authorize(`product-category.read`), crudController.read);
productCategoryRoutes.post(`/search`, authorize(`product-category.read`), crudController.search);
productCategoryRoutes.post(`/is-exists`, authorize(`product-category.read`), crudController.isExists);
productCategoryRoutes.post(`/page`, authorize(`product-category.read`), crudController.page);
productCategoryRoutes.put(`/update/:id`, requestValidator(ProductCategory, "body"), authorize(`product-category.update`), crudController.update);
productCategoryRoutes.delete(`/delete`, authorize(`product-category.delete`), crudController.delete);
productCategoryRoutes.patch(`/restore`, authorize(`product-category.delete`), crudController.restore);

export default productCategoryRoutes;