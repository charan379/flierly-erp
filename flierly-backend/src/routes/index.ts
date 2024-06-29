import controllers from "@/controllers";
import authenticate from "@/controllers/user-controller/authenticate";
import { errorBoundary } from "@/middlewares/error-boundary.middleware";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

const routeGenerator = (model: string, controller: any) => {
    router.post(`/${model}/create`, errorBoundary(controller['create'], model));
    router.get(`/${model}/read/:id`, errorBoundary(controller['read'], model));
    router.get(`/${model}/search`, errorBoundary(controller['search'], model));
    router.get(`/${model}/exists`, errorBoundary(controller['exists'], model));
    router.get(`/${model}/page`, errorBoundary(controller['page'], model));
    router.patch(`/${model}/update/:id`, errorBoundary(controller['update'], model));
    router.delete(`/${model}/delete/:id`, errorBoundary(controller['delete'], model));

    if (model === 'user') {
        router.post(`/${model}/authenticate`, errorBoundary(authenticate, model));
    }
}

getModelsList().then(async (models) => {
    const controllersList = await controllers();
    models.forEach(({ name: modelName }) => {
        routeGenerator(modelName, controllersList[modelName])
    });
});

export default router;