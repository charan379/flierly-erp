import entities from '@/controllers/misc-controller/entities';
import systemUsage from '@/controllers/misc-controller/systemUsage';
import testExecuteRawSQL from '@/controllers/misc-controller/testExecuteRawSQL';
import testTypeORMActivate from '@/controllers/misc-controller/testTypeORMActivate';
import testTypeORMCreate from '@/controllers/misc-controller/testTypeORMCreate';
import testTypeORMDeactivate from '@/controllers/misc-controller/testTypeORMDeactivate';
import testTypeORMDelete from '@/controllers/misc-controller/testTypeORMDelete';
import testTypeORMExists from '@/controllers/misc-controller/testTypeORMExists';
import testTypeORMPage from '@/controllers/misc-controller/testTypeORMPage';
import testTypeORMRead from '@/controllers/misc-controller/testTypeORMRead';
import testTypeORMRestore from '@/controllers/misc-controller/testTypeORMRestore';
import testTypeORMSearch from '@/controllers/misc-controller/testTypeORMSearch';
import testTypeORMUpdate from '@/controllers/misc-controller/testTypeORMUpdate';
import uploadFileController from '@/controllers/upload-controller/upload-file.controller';
import { authorize } from '@/middlewares/authorization.middleware';
import { controllerErrorBoundary } from '@/middlewares/controller-error-boundary.middleware';
import { upload } from '@/middlewares/multer.middleware';
import { Router } from 'express';

const miscRouter = Router();

miscRouter.get(`/entities`, authorize(), controllerErrorBoundary(entities, 'misc'));
miscRouter.post(`/misc/test-upload`, upload.single('file'), authorize(), controllerErrorBoundary(uploadFileController, 'misc'));

miscRouter.get(`/system-usage`, controllerErrorBoundary(systemUsage, 'misc'));
miscRouter.get('/test/raw-query/:id', controllerErrorBoundary(testExecuteRawSQL, 'Role'));
miscRouter.post('/test/type-orm-page', controllerErrorBoundary(testTypeORMPage, 'Role'));
miscRouter.post('/test/type-orm-create', controllerErrorBoundary(testTypeORMCreate, 'Role'));
miscRouter.get('/test/type-orm-read/:id', controllerErrorBoundary(testTypeORMRead, 'Role'));
miscRouter.delete('/test/type-orm-delete', controllerErrorBoundary(testTypeORMDelete, 'Role'));
miscRouter.patch('/test/type-orm-restore', controllerErrorBoundary(testTypeORMRestore, 'Role'));
miscRouter.patch('/test/type-orm-activate', controllerErrorBoundary(testTypeORMActivate, 'Role'));
miscRouter.patch('/test/type-orm-deactivate', controllerErrorBoundary(testTypeORMDeactivate, 'Role'));
miscRouter.put('/test/type-orm-update/:id', controllerErrorBoundary(testTypeORMUpdate, 'Role'));
miscRouter.post('/test/type-orm-exists', controllerErrorBoundary(testTypeORMExists, 'Role'));
miscRouter.post('/test/type-orm-search', controllerErrorBoundary(testTypeORMSearch, 'Role'));

export default miscRouter;
