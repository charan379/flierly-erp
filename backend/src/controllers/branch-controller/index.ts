import CRUDController from "@/lib/crud-controller";
import create from "./create";

const branchController = async () => {
    const defaultController = await CRUDController('Branch');
    return { ...defaultController, create };

}

export default branchController;