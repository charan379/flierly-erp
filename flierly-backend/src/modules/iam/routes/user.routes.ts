import authenticate from '@/modules/iam/controllers/user-controller/authenticate';
import refreshUserAccessToken from '@/modules/iam/controllers/user-controller/refresh-access-token';
import updatePassword from '@/modules/iam/controllers/user-controller/update-password';
import { authorize } from '@/middlewares/authorization.middleware';
import { Router } from 'express';
import CRUDController from '@/modules/core/controllers/crud-controller';
import User from '../entities/User.entity';
import { requestValidator } from '@/middlewares/request-validator.middleware';

// user router
const userRoutes = Router();

const crudController = CRUDController(User);

userRoutes.post(`/authenticate`, authenticate);
userRoutes.get(`/refresh-access-token`, authorize(), refreshUserAccessToken);
userRoutes.post(`/update-password`, authorize('user.manage-password'), updatePassword);

// crud routes
userRoutes.post(`/create`, requestValidator(User, "body"), authorize(`user.create`), crudController.create);
userRoutes.post(`/read`, authorize(`user.read`), crudController.read);
userRoutes.post(`/search`, authorize(`user.read`), crudController.search);
userRoutes.post(`/is-exists`, authorize(`user.read`), crudController.isExists);
userRoutes.post(`/page`, authorize(`user.read`), crudController.page);
userRoutes.post(`/associated-entity-records-page`, authorize(`user.read`), crudController.associatedEntityRecordsPage);
userRoutes.put(`/update/:id`, requestValidator(User, "body"), authorize(`user.update`), crudController.update);
userRoutes.patch(`/activate`, authorize(`user.manage`), crudController.activate);
userRoutes.patch(`/inactivate`, authorize(`user.manage`), crudController.inactivate);
userRoutes.delete(`/delete`, authorize(`user.delete`), crudController.delete);
userRoutes.patch(`/restore`, authorize(`user.delete`), crudController.restore);
userRoutes.patch(`/update-associated-records`, authorize(`user.manage`), crudController.updateAssociatedEntityRecords);

export default userRoutes;
