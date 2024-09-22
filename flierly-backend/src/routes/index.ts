import controllers from "@/controllers";
import models from "@/controllers/misc-controller/models";
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
import authenticate from "@/controllers/user-controller/authenticate";
import refreshAccessToken from "@/controllers/user-controller/refreshAccessToken";
import getEntityList from "@/entities";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { Router } from "express";

const router = Router();

router.post(`/user/authenticate`, errorBoundary(authenticate, 'user'));
router.get(`/user/refresh-access-token`, authorize(), errorBoundary(refreshAccessToken, 'user'));
router.get(`/models`, authorize(), errorBoundary(models, "misc"));
router.post('/test/type-orm-page', errorBoundary(testTypeORMPage, 'Role'));
router.post('/test/type-orm-create', errorBoundary(testTypeORMCreate, 'Role'));
router.get('/test/type-orm-read/:id', errorBoundary(testTypeORMRead, 'Role'));
router.delete('/test/type-orm-delete', errorBoundary(testTypeORMDelete, 'Role'));
router.patch('/test/type-orm-restore', errorBoundary(testTypeORMRestore, 'Role'));
router.patch('/test/type-orm-activate', errorBoundary(testTypeORMActivate, 'Role'));
router.patch('/test/type-orm-deactivate', errorBoundary(testTypeORMDeactivate, 'Role'));
router.put('/test/type-orm-update/:id', errorBoundary(testTypeORMUpdate, 'Role'));
router.post('/test/type-orm-exists', errorBoundary(testTypeORMExists, 'Role'));
router.post('/test/type-orm-search', errorBoundary(testTypeORMSearch, 'Role'));

const routeGenerator = (entityCode: string, controller: any) => {
    router.post(`/${entityCode}/create`, authorize(`${entityCode}.create`), errorBoundary(controller['create'], entityCode));
    router.get(`/${entityCode}/read/:id`, authorize(`${entityCode}.read`), errorBoundary(controller['read'], entityCode));
    router.post(`/${entityCode}/search`, authorize(`${entityCode}.read`), errorBoundary(controller['search'], entityCode));
    router.post(`/${entityCode}/exists`, authorize(`${entityCode}.read`), errorBoundary(controller['exists'], entityCode));
    router.post(`/${entityCode}/page`, authorize(`${entityCode}.read`), errorBoundary(controller['page'], entityCode));
    router.put(`/${entityCode}/update/:id`, authorize(`${entityCode}.update`), errorBoundary(controller['update'], entityCode));
    router.patch(`/${entityCode}/activate`, authorize(`${entityCode}.manage`), errorBoundary(controller['activate'], entityCode));
    router.patch(`/${entityCode}/deactivate`, authorize(`${entityCode}.manage`), errorBoundary(controller['deactivate'], entityCode));
    router.delete(`/${entityCode}/delete`, authorize(`${entityCode}.delete`), errorBoundary(controller['delete'], entityCode));
    router.patch(`/${entityCode}/restore`, authorize(`${entityCode}.delete`), errorBoundary(controller['restore'], entityCode));
}

getEntityList().then(async (entities) => {
    const controllersList = await controllers();
    entities.forEach(({ code, controller }) => {
        routeGenerator(code, controllersList[controller]);
    });
});

export default router;