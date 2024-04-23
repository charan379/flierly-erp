import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import pageResponseBuilder from "@/utils/page-response.builder";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

export interface PageRequest {
    fields: string,
    queries: string,
    sort: string,
    page: number,
    limit: number
}

const pageRequestSchema: Joi.ObjectSchema<PageRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
    sort: Joi.string().default('createdAt.asc'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(20),
});

const page = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {

        const pageRequest: PageRequest = await JoiSchemaValidator(pageRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic page request API.");

        const query: { $and: object[] } = buildMongoQuery(pageRequest.fields.split(","), pageRequest.queries.split(","));

        const sort: SortObject = buildMongoSortObject(pageRequest.sort);

        const page: number = pageRequest.page;

        const limit: number = pageRequest.limit;
        
        const skip: number = (page * limit) - limit;

        const resultsPromise = model.find({ ...query }, { __v: 0 })
            .where("isDeleted", false)
            .sort({ ...sort })
            .skip(skip)
            .limit(limit)
            .exec();

        const countPromise = model.countDocuments({ ...query })
            .where("isDeleted", false)
            .exec();

        const [results, count] = await Promise.all([resultsPromise, countPromise]);

        const re: PageResult = await pageResponseBuilder(results, page, limit, count, sort);

        return res.status(HttpCodes.OK).json(re);

    } catch (error) {
        next(error);
    }
};

export default page;