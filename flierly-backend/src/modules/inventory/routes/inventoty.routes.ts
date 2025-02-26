import { Router } from "express";
import Inventory from "../entities/Inventory.entity";
import CRUDController from "@/modules/core/controllers/crud-controller";
import { requestValidator } from "@/middlewares/request-validator.middleware";
import { authorize } from "@/middlewares/authorization.middleware";
import iocContainer from "@/lib/di-ioc-container";
import InventoryController from "../controller/inventrory-controller/InventoryController";
import BeanTypes from "@/lib/di-ioc-container/bean.types";


const inventoryRoutes = Router();

const crudController = CRUDController(Inventory);

const inventoryController = iocContainer.get<InventoryController>(BeanTypes.InventoryController);
// crud routes
inventoryRoutes.post(`/create`, requestValidator(Inventory, "body"), authorize(`inventory.create`), crudController.create);
inventoryRoutes.post(`/read`, authorize(`inventory.read`), crudController.read);
inventoryRoutes.post(`/search`, authorize(`inventory.read`), crudController.search);
inventoryRoutes.post(`/is-exists`, authorize(`inventory.read`), crudController.isExists);
inventoryRoutes.post(`/page`, authorize(`inventory.read`), crudController.page);
inventoryRoutes.put(`/update/:id`, requestValidator(Inventory, "body"), authorize(`inventory.update`), crudController.update);
inventoryRoutes.delete(`/delete`, authorize(`inventory.delete`), crudController.delete);
inventoryRoutes.patch(`/restore`, authorize(`inventory.delete`), crudController.restore);
inventoryRoutes.get(`/statistics`, authorize(`inventory.read`), inventoryController.statistics.bind(inventoryController));


export default inventoryRoutes;