import { EntityTarget, ObjectLiteral } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import create from './create';
import read from './read';
import update from './update';
import softDelete from './delete';
import search from './search';
import isExists from './is-exists';
import activate from './activate';
import restore from './restore';
import inactivate from './inactivate';
import updateAssociatedEntityRecords from './update-entity-associated-records';
import associatedEntityRecordsPage from './associated-entity-records-page';
import page from './page';

export interface ICRUDController {
  create: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  read: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  page: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  associatedEntityRecordsPage: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  search: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  isExists: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  activate: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  inactivate: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  restore: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  updateAssociatedEntityRecords: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}

/**
 * Generate CRUD methods for a given entity.
 * @param entity - The entity to generate CRUD methods for.
 * @returns An object containing the CRUD methods.
 */
const CRUDController = (entity: EntityTarget<ObjectLiteral>): ICRUDController => {
  const crudMethods = {
    create: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => create(entity, req, res, next),
    read: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => read(entity, req, res, next),
    update: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => update(entity, req, res, next),
    delete: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => softDelete(entity, req, res, next),
    page: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => page(entity, req, res, next),
    associatedEntityRecordsPage: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => associatedEntityRecordsPage(entity, req, res, next),
    search: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => search(entity, req, res, next),
    isExists: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => isExists(entity, req, res, next),
    activate: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => activate(entity, req, res, next),
    inactivate: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => inactivate(entity, req, res, next),
    restore: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => restore(entity, req, res, next),
    updateAssociatedEntityRecords: (req: Request, res: Response, next: NextFunction): Promise<Response | void> => updateAssociatedEntityRecords(entity, req, res, next),
  };

  return crudMethods;
};

export default CRUDController;
