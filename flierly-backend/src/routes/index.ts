import controllers from "@/controllers";
import { catchErrors } from "@/middlewares/catch-errors.middleware";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

const routeGenerator = (model: string, controller: any) => {
    router.route(`/${model}/create`).post(catchErrors(controller['create'], model));
    router.route(`/${model}/read/:id`).get(catchErrors(controller['read'], model));
    router.route(`/${model}/search`).get(catchErrors(controller['search'], model));
    router.route(`/${model}/exists`).get(catchErrors(controller['exists'], model));
    router.route(`/${model}/page`).get(catchErrors(controller['page'], model));
    router.route(`/${model}/update/:id`).patch(catchErrors(controller['update'], model));
    router.route(`/${model}/delete/:id`).delete(catchErrors(controller['delete'], model));
}

getModelsList().then(async (models) => {
    const controllersList = await controllers();
    models.forEach(({ name: modelName }) => {
        routeGenerator(modelName, controllersList[modelName])
    });
});

export default router;