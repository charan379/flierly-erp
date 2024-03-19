import CRUDController from "@/lib/crud-controller";
import { modelsList } from "@/models";


const controllers = () => {

    const contros: any = {};

    modelsList.forEach(({ model, name }) => {
        contros[name] = CRUDController(model);
    });
}

export default controllers;