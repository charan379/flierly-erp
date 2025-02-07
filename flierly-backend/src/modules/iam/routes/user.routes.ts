import { authorize } from '@/middlewares/authorization.middleware';
import { Router } from 'express';
import CRUDController from '@/modules/core/controllers/crud-controller';
import User from '../entities/User.entity';
import { requestValidator } from '@/middlewares/request-validator.middleware';
import EntityRecordsPageRequestDTO from '@/modules/core/dto/EntityRecordsPageRequest.dto';
import AssociatedEntityRecordsPageRequestDTO from '@/modules/core/dto/AssociatedEntityRecordsPageRequest.dto';
import iocContainer from '@/lib/di-ioc-container';
import BeanTypes from '@/lib/di-ioc-container/bean.types';
import UserController from '../controllers/user-controller/UserController';

// user router
const userRoutes = Router();

const crudController = CRUDController(User);

const userController = iocContainer.get<UserController>(BeanTypes.UserController);
userRoutes.post(`/authenticate`, userController.authenticate.bind(userController));
userRoutes.get(`/refresh-access-token`, authorize(), userController.refreshAccessToken.bind(userController));
userRoutes.post(`/update-password`, authorize('user.manage-password'), userController.updatePassword.bind(userController));

// crud routes
userRoutes.post(`/create`, requestValidator(User, "body"), authorize(`user.create`), crudController.create);
userRoutes.post(`/read`, authorize(`user.read`), crudController.read);
userRoutes.post(`/search`, authorize(`user.read`), crudController.search);
userRoutes.post(`/is-exists`, authorize(`user.read`), crudController.isExists);
userRoutes.post(`/page`, requestValidator(EntityRecordsPageRequestDTO, "body"), authorize(`user.read`), crudController.page);
userRoutes.post(`/associated-entity-records-page`, requestValidator(AssociatedEntityRecordsPageRequestDTO, "body"), authorize(`user.read`), crudController.associatedEntityRecordsPage);
userRoutes.put(`/update/:id`, requestValidator(User, "body"), authorize(`user.update`), crudController.update);
userRoutes.patch(`/activate`, authorize(`user.manage`), crudController.activate);
userRoutes.patch(`/inactivate`, authorize(`user.manage`), crudController.inactivate);
userRoutes.delete(`/delete`, authorize(`user.delete`), crudController.delete);
userRoutes.patch(`/restore`, authorize(`user.delete`), crudController.restore);
userRoutes.patch(`/update-associated-records`, authorize(`user.manage`), crudController.updateAssociatedEntityRecords);

export default userRoutes;
