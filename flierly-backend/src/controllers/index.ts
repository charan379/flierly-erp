import getEntityList from '@/entities';
import { globSync } from 'glob';
import path from 'path';
import CRUDController, { ICRUDController } from './crud-controller';

const ignoreDirs = ['misc-controller', 'crud-controller', 'branch-controller'];

/**
 * Get custom controllers by scanning the directory and filtering out ignored directories.
 */
export const customControllers: { name: string; directory: string; }[] = globSync(`${__dirname}/**/*-controller`)
  .filter((controllerDir) => !ignoreDirs.includes(controllerDir.split(/[\/\\]/g).slice(-1)[0]))
  .map((controllerDir) => {
    const splittedName = path.basename(controllerDir).split('-');

    return {
      name: splittedName.join('-'),
      directory: controllerDir,
    };
  });

/**
 * Initialize controllers for entities.
 * @returns A record of controllers.
 */
const controllers = async (): Promise<Record<string, ICRUDController>> => {
  const entityList = await getEntityList();
  const controllers: Record<string, ICRUDController> = {};
  const customControllersList: { name: string; directory: string }[] = customControllers;

  for (const entityDetail of entityList) {
    if (customControllersList.some((controller) => controller.name === entityDetail.controller)) {
      const controller = await require(`@/controllers/${entityDetail.controller}`).default();
      controllers[entityDetail.controller] = controller;
    } else {
      controllers[entityDetail.controller] = await CRUDController(entityDetail.entity);
    }
  }

  return controllers;
};

export default controllers;
