import { Branch } from "@/entities/branch/Branch.entity";
import CRUDController from "../crud-controller";

const branchController = async () => {
    const defaultController = await CRUDController(Branch);
    // console.debug(defaultController)
    const controllers = { ...defaultController };
    // console.debug(controllers);
    return controllers;

}

export default branchController;