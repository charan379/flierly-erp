import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

export interface ExistsRequest {
    fields: string,
    queries: string,
}

const existsRequestSchema: Joi.ObjectSchema<ExistsRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
})

const exists = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const existsRequest: ExistsRequest = await JoiSchemaValidator(existsRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic Exists API");

        const query: MongoQueryArray = buildMongoQuery(existsRequest.fields.split(","), existsRequest.queries.split(","), true);

        let result = await model.find({ $or: query }, { __v: 0 })
            .where('isDeleted', false)
            .countDocuments()
            .exec();

        res.status(HttpCodes.OK).json({
            exists: result > 0 ? true : false
        });

    } catch (error) {
        next(error);
    }
}

export default exists;