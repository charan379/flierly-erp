import CRUDController from "@/lib/crud-controller";
import { getModelsList } from "@/models";
import { globSync } from "glob";
import path from "path";


export const customCotrollers = globSync(`${__dirname}/**/*-controller`).map(controllerDir => {
    const splittedName = path.basename(controllerDir).split('-');
    const customCotroller = {
        name: splittedName.slice(0, splittedName.length - 1).join('-'),
        controllerDir: splittedName.join("-")
    }
    // console.debug(customCotroller);
    return customCotroller;
});

const controllers = async () => {
    const modelList = await getModelsList();
    // Create an empty object to hold controllers before the loop
    const controllers: Record<string, object> = {};

    const customControllerNames: string[] = customCotrollers.map((controller => controller.name));

    // Use a loop with `await` for each iteration
    for (const model of modelList) {
        // console.debug(model);
        if (customControllerNames.includes(model.name)) {
            const controller = await require(`@/controllers/${model.name}-controller`).default();
            controllers[model.name] = controller;
        }
        else {
            controllers[model.name] = await CRUDController(model.entity);
        }
    }

    // console.debug(controllers)
    return controllers;
};
export default controllers;
