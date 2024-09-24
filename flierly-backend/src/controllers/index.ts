import getEntityList from "@/entities";
import { globSync } from "glob";
import path from "path";
import CRUDController from "./crud-controller";

const ignoreDirs = ['misc-controller', 'crud-controller', 'branch-controller'];

export const customCotrollers = globSync(`${__dirname}/**/*-controller`)
    .filter(controllerDir => !ignoreDirs.includes(controllerDir.split(/[\/\\]/g).slice(-1)[0]))
    .map(controllerDir => {

        const splittedName = path.basename(controllerDir).split('-');

        const customCotroller = {
            name: splittedName.join("-"),
            directory: controllerDir
        }

        return customCotroller;
    });

const controllers = async () => {
    const entityList = await getEntityList();

    // Create an empty object to hold controllers before the loop
    const controllers: Record<string, object> = {};

    const customControllersList: { name: string, directory: string }[] = customCotrollers;

    // Use a loop with `await` for each iteration
    for (const entityDetail of entityList) {
        if (customControllersList.some((controller) => controller.name === entityDetail.controller)) {
            const controller = await require(`@/controllers/${entityDetail.controller}`).default();
            controllers[entityDetail.controller] = controller;
        }
        else {
            controllers[entityDetail.controller] = await CRUDController(entityDetail.entity);
        }
    }

    return controllers;
};

export default controllers;
