import { authorize } from '@/middlewares/authorization.middleware';
import { Router } from 'express';
import CRUDController from '@/modules/core/controllers/crud-controller';
import { requestValidator } from '@/middlewares/request-validator.middleware';
import Role from '../entities/Role.entity';

// role router
const roleRoutes = Router();

const crudController = CRUDController(Role);

// crud routes
roleRoutes.post(`/create`, requestValidator(Role, "body"), authorize(`role.create`), crudController.create);
roleRoutes.post(`/read`, authorize(`role.read`), crudController.read);
roleRoutes.post(`/search`, authorize(`role.read`), crudController.search);
roleRoutes.post(`/is-exists`, authorize(`role.read`), crudController.isExists);
roleRoutes.post(`/page`, authorize(`role.read`), crudController.page);
roleRoutes.post(`/associated-entity-records-page`, authorize(`role.read`), crudController.associatedEntityRecordsPage);
roleRoutes.put(`/update/:id`, requestValidator(Role, "body"), authorize(`role.update`), crudController.update);
roleRoutes.patch(`/activate`, authorize(`role.manage`), crudController.activate);
roleRoutes.patch(`/inactivate`, authorize(`role.manage`), crudController.inactivate);
roleRoutes.delete(`/delete`, authorize(`role.delete`), crudController.delete);
roleRoutes.patch(`/restore`, authorize(`role.delete`), crudController.restore);
roleRoutes.patch(`/update-associated-records`, authorize(`role.manage`), crudController.updateAssociatedEntityRecords);

export default roleRoutes;
