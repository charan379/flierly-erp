import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import Brand from "../entities/Brand.entity";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";

const brandRoutes = Router();

const crudController = CRUDController(Brand);

// crud routes
brandRoutes.post(`/create`, requestValidator(Brand, "body"), authorize(`brand.create`), crudController.create);
brandRoutes.post(`/read`, authorize(`brand.read`), crudController.read);
brandRoutes.post(`/search`, authorize(`brand.read`), crudController.search);
brandRoutes.post(`/is-exists`, authorize(`brand.read`), crudController.isExists);
brandRoutes.post(`/page`, authorize(`brand.read`), crudController.page);
brandRoutes.put(`/update/:id`, requestValidator(Brand, "body"), authorize(`brand.update`), crudController.update);
brandRoutes.delete(`/delete`, authorize(`brand.delete`), crudController.delete);
brandRoutes.patch(`/restore`, authorize(`brand.delete`), crudController.restore);

export default brandRoutes;