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
import deactivate from './deactivate';
import updateArrayField from './update-array-field';

const CRUDController = async (entityDetails: EntityDetails) => {

    const entity: EntityTarget<ObjectLiteral> = entityDetails.entity;

    let crudMethods = {
        create: (req: Request, res: Response) => create(entity, req, res),
        read: (req: Request, res: Response) => read(entity, req, res),
        update: (req: Request, res: Response) => update(entity, req, res),
        delete: (req: Request, res: Response) => softDelete(entity, req, res),
        page: (req: Request, res: Response) => page(entity, req, res),
        search: (req: Request, res: Response) => search(entity, req, res),
        exists: (req: Request, res: Response) => exists(entity, req, res),
        activate: (req: Request, res: Response) => activate(entity, req, res),
        deactivate: (req: Request, res: Response) => deactivate(entity, req, res),
        restore: (req: Request, res: Response) => restore(entity, req, res),
        updateArrayField: (req: Request, res: Response) => updateArrayField(entity, req, res),
    }

    return crudMethods;

};

export default CRUDController;