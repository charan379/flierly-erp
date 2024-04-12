import CRUDController from "@/lib/crud-controller";
import { getModelsList } from "@/models";
import { globSync } from "glob";
import path from "path";


export const customCotrollers = globSync(`${__dirname}/**/*-controller`).map(controllerDir => {
    const splittedName = path.basename(controllerDir).split('-');
    return {
        name: splittedName.slice(0, splittedName.length - 1).join('-'),
        controllerDir: splittedName.join("-")
    }
});

const controllers = async () => {
    const modelList = await getModelsList();
    // Create an empty object to hold controllers before the loop
    const controllers: Record<string, object> = {};

    // Use a loop with `await` for each iteration
    for (const model of modelList) {
        for (const customCotroller of customCotrollers) {
            if (customCotroller.name === model.name) {
                const controller = await require(`@/controllers/${customCotroller.controllerDir}`).default();
                controllers[model.name] = controller;
            } else {
                controllers[model.name] = await CRUDController(model.entity);
            }
        }
    }

    return controllers;
};
export default controllers;
