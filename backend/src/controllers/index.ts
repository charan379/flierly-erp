import CRUDController from "@/lib/crud-controller";
import { getModelsList } from "@/models";


const controllers = async () => {
    const modelList = await getModelsList();

    // Create an empty object to hold controllers before the loop
    const controllers: Record<string, object> = {};

    // Use a loop with `await` for each iteration
    for (const model of modelList) {
        controllers[model.name] = await CRUDController(model.entity);
    }

    return controllers;
};

export default controllers;
