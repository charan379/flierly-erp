import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

export interface SearchRequest {
    fields: string,
    queries: string,
    sort: string,
    limit: number
};

const searchRequestSchema: Joi.ObjectSchema<SearchRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
    sort: Joi.string().default('name.asc'),
    limit: Joi.number().integer().default(20)
});

const search = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {

        const searchRequest: SearchRequest = await JoiSchemaValidator(searchRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic Search API");

        const sort: SortObject = buildMongoSortObject(searchRequest.sort);

        const query: { $and?: object[] } = buildMongoQuery(searchRequest.fields.split(","), searchRequest.queries.split(","));

        let result = await model.find({ ...query }, { __v: 0 })
            .where('isDeleted', false)
            .sort({ ...sort })
            .limit(searchRequest.limit)
            .exec();

        res.status(HttpCodes.OK).json(result);

    } catch (error) {
        next(error);
    }
};

export default search;