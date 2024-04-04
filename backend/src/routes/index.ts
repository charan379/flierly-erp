import controllers from "@/controllers";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

const routeGenerator = (entityName: string, controller: any) => {
    router.route(`/${entityName}/create`).post(controller['create']);
    router.route(`/${entityName}/read`).post(controller['read']);
}

getModelsList().then(async (models) => {
    const controllersList = await controllers();
    models.forEach(({ name }) => {
        routeGenerator(name, controllersList[name])
    });
})
export default router;