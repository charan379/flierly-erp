import { getModelsList } from "@/models"
import mongoose from "mongoose"
import create from "./create";
import { Request, Response } from "express";
import read from "./read";


const CRUDController = async (modelName: string) => {

    const modelDetails = await getModelsList().then((models) =>
        models.filter((model) => model.entity === modelName)
    );

    if (modelDetails === undefined) throw new Error(`Model ${modelName} does not exists!`);

    if (!modelDetails[0]?.entity || !modelDetails[0]?.filePath) {
        throw new Error(`Model ${modelName} does not exists!`);
    }

    const model: mongoose.Model<any> = require(`@/models/${modelDetails[0].filePath.split(/\\|\//).slice(-1)}`);

    if (!model) {
        throw new Error(`Failed to import model ${modelName}`);
    }


    let crudMethods = {
        create: (req: Request, res: Response) => create(model, req, res),
        read: (req: Request, res: Response) => read(model, req, res),
        update: {},
        delete: {},
        page: {},
        search: {},
    }

    return crudMethods;
}


export default CRUDController;