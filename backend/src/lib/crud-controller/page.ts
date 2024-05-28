import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import pageResponseBuilder from "@/utils/page-response.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

export interface PageRequest {
    fields: string,
    queries: string,
    sort: string,
    page: number,
    limit: number,
    autopopulate: boolean,
}

const pageRequestSchema: Joi.ObjectSchema<PageRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
    sort: Joi.string().default('createdAt.asc'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(20),
    autopopulate: Joi.boolean().default(false)
});

const page = async (model: mongoose.Model<any>, req: Request, res: Response) => {

        const modelKeys: string[] = Object.keys(model.schema.obj);

        const pageRequest: PageRequest = await JoiSchemaValidator(pageRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic page request API.");

        let query: MongoQueryArray = buildMongoQuery(pageRequest.fields.split(","), pageRequest.queries.split(","));

        const sort: SortObject = buildMongoSortObject(pageRequest.sort);

        const page: number = pageRequest.page;

        const limit: number = pageRequest.limit;

        const skip: number = (page * limit) - limit;

        if (modelKeys.includes('isDeleted'))
            query.push({ isDeleted: false })

        const resultsPromise = model.find({ $and: query }, { __v: 0 }, { autopopulate: pageRequest.autopopulate })
            .sort({ ...sort })
            .skip(skip)
            .limit(limit)
            .exec();

        const countPromise = model.countDocuments({ $and: query })
            .exec();

        const [results, count] = await Promise.all([resultsPromise, countPromise]);

        const re: PageResult = await pageResponseBuilder(results, page, limit, count, sort);

        return res.status(HttpCodes.OK).json(re);
};

export default page;