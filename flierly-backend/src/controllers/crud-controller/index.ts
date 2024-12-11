import { EntityTarget, ObjectLiteral } from 'typeorm';
import { Request, Response } from 'express';
import create from './create';
import read from './read';
import update from './update';
import softDelete from './delete';
import page from './page';
import search from './search';
import exists from './exists';
import activate from './activate';
import restore from './restore';
import inactivate from './inactivate';
import updateArrayField from './updateArrayField';
import relatedEntitiesPage from './relatedEntitiesPage';

const CRUDController = async (entity: EntityTarget<ObjectLiteral>) => {

    let crudMethods = {
        create: (req: Request, res: Response) => create(entity, req, res),
        read: (req: Request, res: Response) => read(entity, req, res),
        update: (req: Request, res: Response) => update(entity, req, res),
        delete: (req: Request, res: Response) => softDelete(entity, req, res),
        page: (req: Request, res: Response) => page(entity, req, res),
        relatedEntitiesPage: (req: Request, res: Response) => relatedEntitiesPage(entity, req, res),
        search: (req: Request, res: Response) => search(entity, req, res),
        exists: (req: Request, res: Response) => exists(entity, req, res),
        activate: (req: Request, res: Response) => activate(entity, req, res),
        inactivate: (req: Request, res: Response) => inactivate(entity, req, res),
        restore: (req: Request, res: Response) => restore(entity, req, res),
        updateArrayField: (req: Request, res: Response) => updateArrayField(entity, req, res),
    }

    return crudMethods;

};

export default CRUDController;