import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const read = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {

        const modelKeys: string[] = Object.keys(model.schema.obj);

        let query: { _id: mongoose.ObjectId, isDeleted?: boolean } = {
            _id: await JoiSchemaValidator(objectIdSchema, req.params.id, {}, "dynamic-read"),
        };

        if (modelKeys.includes('isDeleted'))
            query = { ...query, isDeleted: false };

        const result = await model.findOne(query, { __v: 0 }, { autopopulate: req?.query?.autopopulate === 'true' ? true : false }).exec();

        if (!result) {
            res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` })
        } else {
            res.status(HttpCodes.OK).json(result);
        }
    } catch (error) {
        next(error);
    }
}


export default read;