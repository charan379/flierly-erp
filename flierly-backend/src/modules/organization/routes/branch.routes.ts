import { requestValidator } from "@/middlewares/request-validator.middleware";
import CRUDController from "@/modules/core/controllers/crud-controller";
import { Router } from "express";
import { authorize } from "@/middlewares/authorization.middleware";
import Branch from "../entities/Branch.entity";

const branchRoutes = Router();

const crudController = CRUDController(Branch);

// crud routes
branchRoutes.post(`/create`, requestValidator(Branch, "body"), authorize(`branch.create`), crudController.create);
branchRoutes.post(`/read`, authorize(`branch.read`), crudController.read);
branchRoutes.post(`/search`, authorize(`branch.read`), crudController.search);
branchRoutes.post(`/is-exists`, authorize(`branch.read`), crudController.isExists);
branchRoutes.post(`/page`, authorize(`branch.read`), crudController.page);
branchRoutes.put(`/update/:id`, requestValidator(Branch, "body"), authorize(`branch.update`), crudController.update);
branchRoutes.delete(`/delete`, authorize(`branch.delete`), crudController.delete);
branchRoutes.patch(`/restore`, authorize(`branch.delete`), crudController.restore);

export default branchRoutes;