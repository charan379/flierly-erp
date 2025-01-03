import { EntityTarget, ObjectLiteral } from 'typeorm';
import { Request, Response } from 'express';
import create from './create.controller';
import read from './read.controller';
import update from './update.controller';
import softDelete from './delete.controller';
import page from './page.controller';
import search from './search.controller';
import isExists from './is-exists.controller';
import activate from './activate.controller';
import restore from './restore.controller';
import inactivate from './inactivate.controller';
import updateAssociatedEntityRecords from './update-entity-associated-records.controller';
import associatedEntityRecordsPage from './associated-entity-records-page.controller';

export interface ICRUDController {
  create: (req: Request, res: Response) => Promise<Response>;
  read: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  page: (req: Request, res: Response) => Promise<Response>;
  associatedEntityRecordsPage: (req: Request, res: Response) => Promise<Response>;
  search: (req: Request, res: Response) => Promise<Response>;
  isExists: (req: Request, res: Response) => Promise<Response>;
  activate: (req: Request, res: Response) => Promise<Response>;
  inactivate: (req: Request, res: Response) => Promise<Response>;
  restore: (req: Request, res: Response) => Promise<Response>;
  updateAssociatedEntityRecords: (req: Request, res: Response) => Promise<Response>;
}

/**
 * Generate CRUD methods for a given entity.
 * @param entity - The entity to generate CRUD methods for.
 * @returns An object containing the CRUD methods.
 */
const CRUDController = async (entity: EntityTarget<ObjectLiteral>): Promise<ICRUDController> => {
  const crudMethods = {
    create: (req: Request, res: Response): Promise<Response> => create(entity, req, res),
    read: (req: Request, res: Response): Promise<Response> => read(entity, req, res),
    update: (req: Request, res: Response): Promise<Response> => update(entity, req, res),
    delete: (req: Request, res: Response): Promise<Response> => softDelete(entity, req, res),
    page: (req: Request, res: Response): Promise<Response> => page(entity, req, res),
    associatedEntityRecordsPage: (req: Request, res: Response): Promise<Response> => associatedEntityRecordsPage(entity, req, res),
    search: (req: Request, res: Response): Promise<Response> => search(entity, req, res),
    isExists: (req: Request, res: Response): Promise<Response> => isExists(entity, req, res),
    activate: (req: Request, res: Response): Promise<Response> => activate(entity, req, res),
    inactivate: (req: Request, res: Response): Promise<Response> => inactivate(entity, req, res),
    restore: (req: Request, res: Response): Promise<Response> => restore(entity, req, res),
    updateAssociatedEntityRecords: (req: Request, res: Response): Promise<Response> => updateAssociatedEntityRecords(entity, req, res),
  };

  return crudMethods;
};

export default CRUDController;
