import entities from "@/controllers/misc-controller/entities";
import systemUsage from "@/controllers/misc-controller/systemUsage";
import testExecuteRawSQL from "@/controllers/misc-controller/testExecuteRawSQL";
import testTypeORMActivate from "@/controllers/misc-controller/testTypeORMActivate";
import testTypeORMCreate from "@/controllers/misc-controller/testTypeORMCreate";
import testTypeORMDeactivate from "@/controllers/misc-controller/testTypeORMDeactivate";
import testTypeORMDelete from "@/controllers/misc-controller/testTypeORMDelete";
import testTypeORMExists from "@/controllers/misc-controller/testTypeORMExists";
import testTypeORMPage from "@/controllers/misc-controller/testTypeORMPage";
import testTypeORMRead from "@/controllers/misc-controller/testTypeORMRead";
import testTypeORMRestore from "@/controllers/misc-controller/testTypeORMRestore";
import testTypeORMSearch from "@/controllers/misc-controller/testTypeORMSearch";
import testTypeORMUpdate from "@/controllers/misc-controller/testTypeORMUpdate";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { Router } from "express";

const miscRouter = Router();

miscRouter.get(`/entities`, authorize(), errorBoundary(entities, "misc"));
miscRouter.get(`/system-usage`, authorize(), errorBoundary(systemUsage, "misc"));
miscRouter.get('/test/raw-query/:id', errorBoundary(testExecuteRawSQL, 'Role'));
miscRouter.post('/test/type-orm-page', errorBoundary(testTypeORMPage, 'Role'));
miscRouter.post('/test/type-orm-create', errorBoundary(testTypeORMCreate, 'Role'));
miscRouter.get('/test/type-orm-read/:id', errorBoundary(testTypeORMRead, 'Role'));
miscRouter.delete('/test/type-orm-delete', errorBoundary(testTypeORMDelete, 'Role'));
miscRouter.patch('/test/type-orm-restore', errorBoundary(testTypeORMRestore, 'Role'));
miscRouter.patch('/test/type-orm-activate', errorBoundary(testTypeORMActivate, 'Role'));
miscRouter.patch('/test/type-orm-deactivate', errorBoundary(testTypeORMDeactivate, 'Role'));
miscRouter.put('/test/type-orm-update/:id', errorBoundary(testTypeORMUpdate, 'Role'));
miscRouter.post('/test/type-orm-exists', errorBoundary(testTypeORMExists, 'Role'));
miscRouter.post('/test/type-orm-search', errorBoundary(testTypeORMSearch, 'Role'));

export default miscRouter;