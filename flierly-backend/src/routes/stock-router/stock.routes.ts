import getStockConversions from "@/controllers/stock-controller/getStockConversions";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { Router } from "express";

const stockRouter = Router();

stockRouter.get(`/stock/conversions/:id`, authorize(), errorBoundary(getStockConversions, 'stock'));

export default stockRouter;