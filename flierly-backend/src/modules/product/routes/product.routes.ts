import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import Product from "../entities/Product.entity";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import iocContainer from "@/lib/di-ioc-container";
import ProductModuleBeanTypes from "../ioc-config/bean.types";
import ProductController from "../controller/product-controller/ProductController";
// import ProductAvailabilityView from "../entities/ProductAvailabilityView.entity";


const productRoutes = Router();

const productController: ProductController = iocContainer.get(ProductModuleBeanTypes.ProductController);
const crudController = CRUDController(Product);
// const crudControllerProductAvailablity = CRUDController(ProductAvailabilityView);

// crud routes
productRoutes.post(`/create`, requestValidator(Product, "body"), authorize(`product.create`), productController.create.bind(productController));
// productRoutes.post(`/availability-page`, crudControllerProductAvailablity.page.bind(crudControllerProductAvailablity));
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