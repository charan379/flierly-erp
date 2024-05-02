import CRUDController from "@/lib/crud-controller";
import create from "./create";

const userController = async () => {
    const defaultController = await CRUDController('User');
    // console.log(defaultController)
    const controllers = {...defaultController, create};
    // console.log(controllers);
    return controllers;
}

export default userController;