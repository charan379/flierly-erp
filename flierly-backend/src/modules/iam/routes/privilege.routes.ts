import { authorize } from '@/middlewares/authorization.middleware';
import { Router } from 'express';
import CRUDController from '@/modules/core/controllers/crud-controller';
import { requestValidator } from '@/middlewares/request-validator.middleware';
import Privilege from '../entities/Privilege.entity';
import PageRequestDTO from '@/modules/core/dto/PageRequest.dto';
import AssociatedEntityRecordsPageRequestDTO from '@/modules/core/dto/AssociatedEntityRecordsPageRequest.dto';

// privilege router
const privilegeRoutes = Router();

const crudController = CRUDController(Privilege);

// crud routes
privilegeRoutes.post(`/create`, requestValidator(Privilege, "body"), authorize(`privilege.create`), crudController.create);
privilegeRoutes.post(`/read`, authorize(`privilege.read`), crudController.read);
privilegeRoutes.post(`/search`, authorize(`privilege.read`), crudController.search);
privilegeRoutes.post(`/is-exists`, authorize(`privilege.read`), crudController.isExists);
privilegeRoutes.post(`/page`, requestValidator(PageRequestDTO, "body"), authorize(`privilege.read`), crudController.page);
privilegeRoutes.post(`/associated-entity-records-page`, requestValidator(AssociatedEntityRecordsPageRequestDTO, "body"), authorize(`privilege.read`), crudController.associatedEntityRecordsPage);
privilegeRoutes.put(`/update/:id`, requestValidator(Privilege, "body"), authorize(`privilege.update`), crudController.update);
privilegeRoutes.patch(`/activate`, authorize(`privilege.manage`), crudController.activate);
privilegeRoutes.patch(`/inactivate`, authorize(`privilege.manage`), crudController.inactivate);
privilegeRoutes.delete(`/delete`, authorize(`privilege.delete`), crudController.delete);
privilegeRoutes.patch(`/restore`, authorize(`privilege.delete`), crudController.restore);
privilegeRoutes.patch(`/update-associated-records`, authorize(`privilege.manage`), crudController.updateAssociatedEntityRecords);

export default privilegeRoutes;
