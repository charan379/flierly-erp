import controllers from '@/controllers';
import { ICRUDController } from '@/controllers/crud-controller';
import getEntityList from '@/entities';
import { authorize } from '@/middlewares/authorization.middleware';
import { controllerErrorBoundary } from '@/middlewares/controller-error-boundary.middleware';
import { Router } from 'express';

const crudRouter = Router();

const routeGenerator = (entityCode: string, controller: ICRUDController) => {
  crudRouter.post(`/${entityCode}/create`, authorize(`${entityCode}.create`), controllerErrorBoundary(controller.create, entityCode));
  crudRouter.post(`/${entityCode}/read`, authorize(`${entityCode}.read`), controllerErrorBoundary(controller['read'], entityCode));
  crudRouter.post(`/${entityCode}/search`, authorize(`${entityCode}.read`), controllerErrorBoundary(controller['search'], entityCode));
  crudRouter.post(`/${entityCode}/is-exists`, authorize(`${entityCode}.read`), controllerErrorBoundary(controller['isExists'], entityCode));
  crudRouter.post(`/${entityCode}/page`, authorize(`${entityCode}.read`), controllerErrorBoundary(controller['page'], entityCode));
  crudRouter.post(`/${entityCode}/associated-entity-records-page`, authorize(`${entityCode}.read`), controllerErrorBoundary(controller['associatedEntityRecordsPage'], entityCode));
  crudRouter.put(`/${entityCode}/update/:id`, authorize(`${entityCode}.update`), controllerErrorBoundary(controller['update'], entityCode));
  crudRouter.patch(`/${entityCode}/activate`, authorize(`${entityCode}.manage`), controllerErrorBoundary(controller['activate'], entityCode));
  crudRouter.patch(`/${entityCode}/inactivate`, authorize(`${entityCode}.manage`), controllerErrorBoundary(controller['inactivate'], entityCode));
  crudRouter.delete(`/${entityCode}/delete`, authorize(`${entityCode}.delete`), controllerErrorBoundary(controller['delete'], entityCode));
  crudRouter.patch(`/${entityCode}/restore`, authorize(`${entityCode}.delete`), controllerErrorBoundary(controller['restore'], entityCode));
  crudRouter.patch(`/${entityCode}/update-associated-records`, authorize(`${entityCode}.manage`), controllerErrorBoundary(controller['updateEntityAssociatedRecords'], entityCode));
};

getEntityList().then(async (entities) => {
  const controllersList = await controllers();
  entities.forEach(({ code, controller }) => {
    routeGenerator(code, controllersList[controller]);
  });
});

export default crudRouter;
