import controllers from "@/controllers";
import models from "@/controllers/misc-controller/models";
import authenticate from "@/controllers/user-controller/authenticate";
import refreshAccessToken from "@/controllers/user-controller/refreshAccessToken";
import { authorize } from "@/middlewares/authorization.middleware";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

router.post(`/user/authenticate`, errorBoundary(authenticate, 'user'));
router.get(`/user/refresh-access-token`, authorize(), errorBoundary(refreshAccessToken, 'user'));
router.get(`/models`, authorize(), errorBoundary(models, "misc"));

const routeGenerator = (model: string, controller: any) => {
    router.post(`/${model}/create`, authorize(`${model}.create`), errorBoundary(controller['create'], model));
    router.get(`/${model}/read/:id`, authorize(`${model}.read`), errorBoundary(controller['read'], model));
    router.get(`/${model}/search`, authorize(`${model}.read`), errorBoundary(controller['search'], model));
    router.get(`/${model}/exists`, authorize(`${model}.read`), errorBoundary(controller['exists'], model));
    router.post(`/${model}/page`, authorize(`${model}.read`), errorBoundary(controller['page'], model));
    router.patch(`/${model}/update/:id`, authorize(`${model}.update`), errorBoundary(controller['update'], model));
    router.put(`/${model}/activate`, authorize(`${model}.manage`), errorBoundary(controller['activate'], model));
    router.delete(`/${model}/delete`, authorize(`${model}.delete`), errorBoundary(controller['delete'], model));
    router.put(`/${model}/restore`, authorize(`${model}.delete`), errorBoundary(controller['restore'], model));
}

getModelsList().then(async (models) => {
    const controllersList = await controllers();
    models.forEach(({ name: modelName }) => {
        routeGenerator(modelName, controllersList[modelName])
    });
});

export default router;