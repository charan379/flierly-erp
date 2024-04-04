import controllers from "@/controllers";
import { getModelsList } from "@/models";
import { Router } from "express";

const router = Router();

const controllersList = controllers().then((controllers => controllers));

getModelsList().then((models) => {
    models.forEach(({ entity, name }) => {
    })
})
export default router;