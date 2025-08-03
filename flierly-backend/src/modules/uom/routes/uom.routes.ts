import { requestValidator } from "@/middlewares/request-validator.middleware";
import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import UOM from "../entities/UOM.entity";
import { authorize } from "@/middlewares/authorization.middleware";

const uomRoutes = Router();

const crudController = CRUDController(UOM);

// crud routes
uomRoutes.post(`/create`, requestValidator(UOM, "body"), authorize(`uom.create`), crudController.create);
uomRoutes.post(`/read`, authorize(`uom.read`), crudController.read);
uomRoutes.post(`/search`, authorize(`uom.read`), crudController.search);
uomRoutes.post(`/is-exists`, authorize(`uom.read`), crudController.isExists);
uomRoutes.post(`/page`, authorize(`uom.read`), crudController.page);
uomRoutes.put(`/update/:id`, requestValidator(UOM, "body"), authorize(`uom.update`), crudController.update);
uomRoutes.delete(`/delete`, authorize(`uom.delete`), crudController.delete);
uomRoutes.patch(`/restore`, authorize(`uom.delete`), crudController.restore);


export default uomRoutes;