import CRUDController from "@/lib/crud-controller";
import create from "./create";

const branchController = async () => {
    const defaultController = await CRUDController('Branch');
    // console.debug(defaultController)
    const controllers = { ...defaultController, create };
    // console.debug(controllers);
    return controllers;

}

export default branchController;