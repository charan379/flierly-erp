import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

export interface SearchRequest {
    fields: string,
    queries: string,
    sort: string,
    limit: number,
    autopopulate: boolean,
};

const searchRequestSchema: Joi.ObjectSchema<SearchRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
    sort: Joi.string().default('name.asc'),
    limit: Joi.number().integer().default(20),
    autopopulate: Joi.boolean().default(false)
});

const search = async (model: mongoose.Model<any>, req: Request, res: Response) => {

        const modelKeys: string[] = Object.keys(model.schema.obj);

        const searchRequest: SearchRequest = await JoiSchemaValidator(searchRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic Search API");

        const sort: SortObject = buildMongoSortObject(searchRequest.sort);

        const query: MongoQueryArray = buildMongoQuery(searchRequest.fields.split(","), searchRequest.queries.split(","));

        if (modelKeys.includes('isDeleted'))
            query.push({ isDeleted: false })

        let result = await model.find({ $and: query }, { __v: 0 }, { autopopulate: searchRequest.autopopulate })
            .sort({ ...sort })
            .limit(searchRequest.limit)
            .exec();

        res.status(HttpCodes.OK).json(result);
};

export default search;