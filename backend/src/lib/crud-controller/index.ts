import { getModelsList } from "@/models"
import mongoose from "mongoose"
import create from "./create";
import { NextFunction, Request, Response } from "express";
import read from "./read";
import search from "./search";
import softDelete from "./delete";
import update from "./update";
import page from "./page";
import exists from "./exists";

const CRUDController = async (modelName: string) => {

    const modelDetails = await getModelsList().then((models) =>
        models.filter((model) => model.entity === modelName)
    );

    if (modelDetails === undefined) throw new Error(`Model ${modelName} does not exists!`);

    if (!modelDetails[0]?.entity || !modelDetails[0]?.filePath) {
        throw new Error(`Model ${modelName} does not exists!`);
    }

    require(`@/models/${modelDetails[0].filePath.split(/\\|\//).slice(-1)}`);

    const model: mongoose.Model<any> = mongoose.model(modelName);

    if (!model) {
        throw new Error(`Failed to import model ${modelName}`);
    }

    let crudMethods = {
        create: (req: Request, res: Response, next: NextFunction) => create(model, req, res, next),
        read: (req: Request, res: Response, next: NextFunction) => read(model, req, res, next),
        update: (req: Request, res: Response, next: NextFunction) => update(model, req, res, next),
        delete: (req: Request, res: Response, next: NextFunction) => softDelete(model, req, res, next),
        page: (req: Request, res: Response, next: NextFunction) => page(model, req, res, next),
        search: (req: Request, res: Response, next: NextFunction) => search(model, req, res, next),
        exists: (req: Request, res: Response, next: NextFunction) => exists(model, req, res, next),
    }

    return crudMethods;
}

export default CRUDController;