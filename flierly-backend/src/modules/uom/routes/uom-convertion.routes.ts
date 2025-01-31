import { requestValidator } from "@/middlewares/request-validator.middleware";
import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import UOM from "../entities/UOM.entity";
import { authorize } from "@/middlewares/authorization.middleware";

const uomConvertionRoutes = Router();

const crudController = CRUDController(UOM);

// crud routes
uomConvertionRoutes.post(`/create`, requestValidator(UOM, "body"), authorize(`uom.create`), crudController.create);
uomConvertionRoutes.post(`/read`, authorize(`uom.read`), crudController.read);
uomConvertionRoutes.post(`/search`, authorize(`uom.read`), crudController.search);
uomConvertionRoutes.post(`/is-exists`, authorize(`uom.read`), crudController.isExists);
uomConvertionRoutes.post(`/page`, authorize(`uom.read`), crudController.page);
uomConvertionRoutes.put(`/update/:id`, requestValidator(UOM, "body"), authorize(`uom.update`), crudController.update);
uomConvertionRoutes.delete(`/delete`, authorize(`uom.delete`), crudController.delete);
uomConvertionRoutes.patch(`/restore`, authorize(`uom.delete`), crudController.restore);


export default uomConvertionRoutes;