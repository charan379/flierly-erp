import getStockConversions from '@/controllers/stock-controller/get-stock-conversions.controller';
import { authorize } from '@/middlewares/authorization.middleware';
import { controllerErrorBoundary } from '@/middlewares/controller-error-boundary.middleware';
import { Router } from 'express';

const stockRouter = Router();

stockRouter.get(`/stock/conversions/:id`, authorize(), controllerErrorBoundary(getStockConversions, 'stock'));

export default stockRouter;
