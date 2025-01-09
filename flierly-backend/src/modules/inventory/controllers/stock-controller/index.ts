import CRUDController from '../../modules/core/controllers/crud-controller';

const stockController = async () => {
  const defaultController = await CRUDController('Stock');
  // console.debug(defaultController)
  const controllers = { ...defaultController };
  // console.debug(controllers);
  return controllers;
};

export default stockController;
