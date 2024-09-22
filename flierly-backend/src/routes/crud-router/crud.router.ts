import controllers from "@/controllers";
import getEntityList from "@/entities";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { Router } from "express";

const crudRouter = Router();

const routeGenerator = (entityCode: string, controller: any) => {
    crudRouter.post(`/${entityCode}/create`, authorize(`${entityCode}.create`), errorBoundary(controller['create'], entityCode));
    crudRouter.get(`/${entityCode}/read/:id`, authorize(`${entityCode}.read`), errorBoundary(controller['read'], entityCode));
    crudRouter.post(`/${entityCode}/search`, authorize(`${entityCode}.read`), errorBoundary(controller['search'], entityCode));
    crudRouter.post(`/${entityCode}/exists`, authorize(`${entityCode}.read`), errorBoundary(controller['exists'], entityCode));
    crudRouter.post(`/${entityCode}/page`, authorize(`${entityCode}.read`), errorBoundary(controller['page'], entityCode));
    crudRouter.put(`/${entityCode}/update/:id`, authorize(`${entityCode}.update`), errorBoundary(controller['update'], entityCode));
    crudRouter.patch(`/${entityCode}/activate`, authorize(`${entityCode}.manage`), errorBoundary(controller['activate'], entityCode));
    crudRouter.patch(`/${entityCode}/deactivate`, authorize(`${entityCode}.manage`), errorBoundary(controller['deactivate'], entityCode));
    crudRouter.delete(`/${entityCode}/delete`, authorize(`${entityCode}.delete`), errorBoundary(controller['delete'], entityCode));
    crudRouter.patch(`/${entityCode}/restore`, authorize(`${entityCode}.delete`), errorBoundary(controller['restore'], entityCode));
}

getEntityList().then(async (entities) => {
    const controllersList = await controllers();
    entities.forEach(({ code, controller }) => {
        routeGenerator(code, controllersList[controller]);
    });
});

export default crudRouter;