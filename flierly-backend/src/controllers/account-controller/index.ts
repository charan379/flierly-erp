import CRUDController, { ICRUDController } from '../crud-controller';
import updateAccount from './update.controller';

const accountController = async (): Promise<ICRUDController> => {
  const defaultController = await CRUDController('Account');

  const controllers = { ...defaultController, update: updateAccount };

  return controllers;
};

export default accountController;
