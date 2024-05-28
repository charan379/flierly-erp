import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";


const update = async (model: mongoose.Model<any>, req: Request, res: Response) => {
        let updates = req.body;

        delete updates.isDeleted;
        delete updates._id;

        const result = await model.findOneAndUpdate(
            {
                _id: await JoiSchemaValidator(objectIdSchema, req.params.id, {}, "dynamic-update"),
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
}

export default update;