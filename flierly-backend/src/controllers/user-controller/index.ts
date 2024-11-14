import CRUDController from "@/lib/crud-controller";
import create from "./create";

const userController = async () => {
    const defaultController = await CRUDController('User');
    // console.debug(defaultController)
    const controllers = {...defaultController, create};
    // console.debug(controllers);
    return controllers;
}

export default userController;