import entities from '@/modules/core/controllers/misc-controller/entities';
import systemUsage from '@/modules/core/controllers/misc-controller/systemUsage';
import executeQueryWithParsedConditionsWithFind from '@/modules/core/controllers/misc-controller/testExecuteQueryWithParsedConditionsFind';
import executeQueryWithParsedConditions from '@/modules/core/controllers/misc-controller/testExecuteQueryWithParsedConditionsQB';
import uploadFileController from '@/modules/storage/controllers/upload-controller/upload-file.controller';
import { authorize } from '@/middlewares/authorization.middleware';
import { controllerErrorBoundary } from '@/middlewares/controller-error-boundary.middleware';
import { upload } from '@/middlewares/multer.middleware';
import { requestValidator } from '@/middlewares/request-validator.middleware';
import { Router } from 'express';

const miscRoutes = Router();

miscRoutes.get(`/entities`, entities);
miscRoutes.post(`/test-upload`, upload.single('file'), authorize(), uploadFileController);

miscRoutes.get(`/system-usage`, systemUsage);
miscRoutes.post('/test/test-execute-query-with-parsed-conditions-qb', requestValidator("account", 'body'), controllerErrorBoundary(executeQueryWithParsedConditions, ''));
miscRoutes.post('/test/test-execute-query-with-parsed-conditions-find', controllerErrorBoundary(executeQueryWithParsedConditionsWithFind, ''));


export default miscRoutes;
