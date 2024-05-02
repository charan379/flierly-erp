import CRUDController from "@/lib/crud-controller"
import create from "./create";

const userController = async () => {
    const defaultController = await CRUDController('User');
    return { ...defaultController, create };
}

export default userController;