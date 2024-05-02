import CRUDController from "@/lib/crud-controller";
import create from "./create";

const branchController = async () => {
    const defaultController = await CRUDController('Branch');
    // console.log(defaultController)
    const controllers = { ...defaultController, create };
    // console.log(controllers);
    return controllers;

}

export default branchController;