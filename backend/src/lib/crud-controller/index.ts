import { modelsList } from "@/models"
import mongoose from "mongoose"


const CRUDController = (modelName: string) => {

    const modelDetails: ModelDetails | undefined = modelsList.map((mDetail) => {
        if (mDetail.model === modelName) {
            return mDetail;
        };
    })[0];

    if (!modelDetails?.model || !modelDetails?.filePath) {
        throw new Error(`Model ${modelName} does not exists!`);
    }

    const model: mongoose.Model<any> = require(`@/models/${modelDetails.filePath.split(/\\|\//).slice(-1)}`);

    if (!model) {
        throw new Error(`Failed to import model ${modelName}`);
    }


    let crudMethods = {
        create: {},
        read: {},
        update: {},
        delete: {},
        page: {},
        search: {},
    }

    return crudMethods;
}


export default CRUDController;