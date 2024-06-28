import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

// Interface for search request parameters
export interface SearchRequest {
    fields: string; // Comma-separated list of fields to retrieve (default: 'name')
    queries: string; // Comma-separated list of search terms (default: ' ')
    sort: string; // Sort criteria in MongoDB format (default: 'name.asc')
    limit: number; // Maximum number of results to return (default: 20)
    autopopulate: boolean; // Whether to automatically populate referenced documents (default: false)
}

// Joi schema for validating search request
const searchRequestSchema: Joi.ObjectSchema<SearchRequest> = Joi.object({
    fields: Joi.string().default('name'),
    queries: Joi.string().default(' '),
    sort: Joi.string().default('name.asc'),
    limit: Joi.number().integer().default(20),
    autopopulate: Joi.boolean().default(false),
});


/**
* Performs a search on the specified Mongoose model based on the provided request parameters.
*
* @param model The Mongoose model to search against
* @param req The Express request object
* @param res The Express response object
* @returns Promise resolving to the search
*/
const search = async (model: mongoose.Model<any>, req: Request, res: Response) => {
    // Extract field names from the model schema
    const modelKeys: string[] = Object.keys(model.schema.obj);
    // Validate request parameters using Joi schema
    const searchRequest: SearchRequest = await JoiSchemaValidator(searchRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic Search API");
    // Build sort object from the request's 'sort' parameter
    const sort: SortObject = buildMongoSortObject(searchRequest.sort);
    // Build a MongoDB query based on the requested fields and search terms
    const query: MongoQueryArray = buildMongoQuery(searchRequest.fields.split(","), searchRequest.queries.split(","));
    // Exclude documents marked as deleted, if the 'isDeleted' field exists
    if (modelKeys.includes('isDeleted'))
        query.push({ isDeleted: false })
    // Execute the search using Mongoose's find method
    let result = await model.find({ $and: query }, { __v: 0 }, { autopopulate: searchRequest.autopopulate })
        .sort({ ...sort })
        .limit(searchRequest.limit)
        .exec();
    // Send successful response with search results
    return res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            result,
            `Data fetched successfully`,
            `${model.modelName.toLowerCase()}.search`,
            req.url,
            null,
            HttpCodes.OK)
    );
};

export default search;