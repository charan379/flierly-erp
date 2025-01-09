import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import ProductSubCategory from "../entities/ProductSubCategory.entity";


const productSubCategoryRoutes = Router();

const crudController = CRUDController(ProductSubCategory);

// crud routes
productSubCategoryRoutes.post(`/create`, requestValidator(ProductSubCategory, "body"), authorize(`product-sub-category.create`), crudController.create);
productSubCategoryRoutes.post(`/read`, authorize(`product-sub-category.read`), crudController.read);
productSubCategoryRoutes.post(`/search`, authorize(`product-sub-category.read`), crudController.search);
productSubCategoryRoutes.post(`/is-exists`, authorize(`product-sub-category.read`), crudController.isExists);
productSubCategoryRoutes.post(`/page`, authorize(`product-sub-category.read`), crudController.page);
productSubCategoryRoutes.post(`/associated-entity-records-page`, authorize(`product-sub-category.read`), crudController.associatedEntityRecordsPage);
productSubCategoryRoutes.put(`/update/:id`, requestValidator(ProductSubCategory, "body"), authorize(`product-sub-category.update`), crudController.update);
productSubCategoryRoutes.patch(`/activate`, authorize(`product-sub-category.manage`), crudController.activate);
productSubCategoryRoutes.patch(`/inactivate`, authorize(`product-sub-category.manage`), crudController.inactivate);
productSubCategoryRoutes.delete(`/delete`, authorize(`product-sub-category.delete`), crudController.delete);
productSubCategoryRoutes.patch(`/restore`, authorize(`product-sub-category.delete`), crudController.restore);
productSubCategoryRoutes.patch(`/update-associated-records`, authorize(`product-sub-category.manage`), crudController.updateAssociatedEntityRecords);

export default productSubCategoryRoutes;