import { getModelsList } from "@/models"
import mongoose from "mongoose"
import create from "./create";
import { Request, Response } from "express";
import read from "./read";
import search from "./search";
import update from "./update";
import page from "./page";
import exists from "./exists";
import activate from "./activate";
import softDelete from "./delete";
import restore from "./restore";

const CRUDController = async (modelName: string) => {

    const modelDetails = await getModelsList().then((models) =>
        models.filter((model) => model.entity === modelName)
    );

    if (modelDetails === undefined) throw new Error(`Model ${modelName} does not exists!`);

    if (!modelDetails[0]?.entity || !modelDetails[0]?.filePath) {
        throw new Error(`Model ${modelName} does not exists!`);
    }

    require(`@/models/${modelDetails[0].filePath.split(/\\|\//).slice(2).join('/')}`);

    const model: mongoose.Model<any> = mongoose.model(modelName);

    if (!model) {
        throw new Error(`Failed to import model ${modelName}`);
    }

    let crudMethods = {
        create: (req: Request, res: Response) => create(model, req, res),
        read: (req: Request, res: Response) => read(model, req, res),
        update: (req: Request, res: Response) => update(model, req, res),
        delete: (req: Request, res: Response) => softDelete(model, req, res),
        page: (req: Request, res: Response) => page(model, req, res),
        search: (req: Request, res: Response) => search(model, req, res),
        exists: (req: Request, res: Response) => exists(model, req, res),
        activate: (req: Request, res: Response) => activate(model, req, res),
        restore: (req: Request, res: Response) => restore(model, req, res),
    }

    return crudMethods;
}

export default CRUDController;