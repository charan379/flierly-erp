import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import SpareCall from "../entities/SpareCall.entity";

const spareCallRoutes = Router();

const crudController = CRUDController(SpareCall);

// crud routes
spareCallRoutes.post(`/create`, requestValidator(SpareCall, "body"), authorize(`spare-call.create`), crudController.create);
spareCallRoutes.post(`/read`, authorize(`spare-call.read`), crudController.read);
spareCallRoutes.post(`/search`, authorize(`spare-call.read`), crudController.search);
spareCallRoutes.post(`/is-exists`, authorize(`spare-call.read`), crudController.isExists);
spareCallRoutes.post(`/page`, authorize(`spare-call.read`), crudController.page);
spareCallRoutes.put(`/update/:id`, requestValidator(SpareCall, "body"), authorize(`spare-call.update`), crudController.update);
spareCallRoutes.delete(`/delete`, authorize(`spare-call.delete`), crudController.delete);
spareCallRoutes.patch(`/restore`, authorize(`spare-call.delete`), crudController.restore);

export default spareCallRoutes;