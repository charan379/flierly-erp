import CRUDController, { ICRUDController } from '../../../core/controllers/crud-controller';
import updateAccount from './update.controller';

const accountController = async (): Promise<ICRUDController> => {
  const defaultController = await CRUDController('Account');

  const controllers = { ...defaultController, update: updateAccount };

  return controllers;
};

export default accountController;
