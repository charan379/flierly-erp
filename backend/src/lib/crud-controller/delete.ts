import HttpCodes from "@/constants/httpCodes";
import { ObjectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const softDelete = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {

        let updates = {
            isDeleted: true,
            isActive: false,
        };

        const result = await model.findOneAndUpdate(
            {
                _id: await JoiSchemaValidator(ObjectIdSchema, req.params.id, {}, "dynamic-delete"),
                isDeleted: false,
            },
            { $set: updates },
            { new: true }
        ).exec();

        if (result) {
            return res.status(HttpCodes.OK).json(result);
        };

        if (!result) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` });
        };

    } catch (error) {
        next(error);
    };

};

export default softDelete;