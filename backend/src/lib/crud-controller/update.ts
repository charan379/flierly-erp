import HttpCodes from "@/constants/httpCodes";
import { ObjectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const update = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        let updates = req.body;

        delete updates.isDeleted;
        delete updates._id;

        const result = await model.findOneAndUpdate(
            {
                _id: await JoiSchemaValidator(ObjectIdSchema, req.params.id, {}, "dynamic-update"),
                isDeleted: false,
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            },
        ).exec();

        if (result) {
            res.status(HttpCodes.OK).json(result);
        }

        if (!result) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` });
        };

    } catch (error) {
        next(error);
    }
}

export default update;