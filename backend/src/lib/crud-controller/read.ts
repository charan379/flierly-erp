import HttpCodes from "@/constants/httpCodes";
import { ObjectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const read = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await model.findOne({
            _id: await JoiSchemaValidator(ObjectIdSchema, req.params.id, {}, "dynamic-read"),
            isDeleted: false
        }).exec();

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