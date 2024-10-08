import CRUDController from "../crud-controller";
import updateAccount from './updateAccount';

const accountController = async () => {
    const defaultController = await CRUDController("Account");

    const controllers = { ...defaultController, update: updateAccount };

    return controllers;
}

export default accountController;