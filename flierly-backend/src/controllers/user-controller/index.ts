import { User } from "@/entities/iam/User.entity";
import CRUDController from "../crud-controller";

const userController = async () => {
    const defaultController = await CRUDController(User);
    // console.debug(defaultController)
    const controllers = {...defaultController};
    // console.debug(controllers);
    return controllers;
}

export default userController;