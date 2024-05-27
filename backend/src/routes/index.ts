import controllers from "@/controllers";
import { catchErrors } from "@/middlewares/catch-errors.middleware";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

const routeGenerator = (entityName: string, controller: any) => {
    router.route(`/${entityName}/create`).post(controller['create']);
    router.route(`/${entityName}/read/:id`).get(controller['read']);
    router.route(`/${entityName}/search`).get(catchErrors(controller['search']));
    router.route(`/${entityName}/exists`).get(controller['exists']);
    router.route(`/${entityName}/page`).get(controller['page']);
    router.route(`/${entityName}/update/:id`).patch(controller['update']);
    router.route(`/${entityName}/delete/:id`).delete(controller['delete']);
}

getModelsList().then(async (models) => {
    const controllersList = await controllers();
    models.forEach(({ name }) => {
        routeGenerator(name, controllersList[name])
    });
});

export default router;