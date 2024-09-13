import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import transformMongoQueryFilter from "@/utils/mongo-query-filters.transformer";
import transformMongoQuerySort from "@/utils/mongo-query-sort.transformer";
import pageResponseBuilder from "@/utils/page-response.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose, { FilterQuery } from "mongoose";

interface PageRequestBody {
    autopopulate: boolean;
    binMode: boolean;
    pagination: { page: number, limit: number };
    sort: { [key: string]: 'ascend' | 'descend' }
    filters: FilterObject
}

// Joi schema for PageRequestBody with defaults
const pageRequestBodySchema: Joi.ObjectSchema<PageRequestBody> = Joi.object({
    autopopulate: Joi.boolean().default(false), // Default: false

    binMode: Joi.boolean().default(false), // Default: false

    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1), // Default: 1
        limit: Joi.number().integer().min(1).default(20), // Default: 20
    }).default({ page: 1, limit: 20 }), // Default pagination object

    sort: Joi.object().pattern(
        Joi.string(), // Any key allowed
        Joi.string().valid('ascend', 'descend') // Values: 'ascend' or 'descend'
    ).default({ createdAt: 'ascend' }), // Default sort by 'createdAt' ascending

    filters: Joi.object().default({}) // Default: empty filter object
});

/**
 * Fetches a paginated list of documents from a Mongoose model based on provided criteria.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection to search in.
 * @param {Request} req The Express request object containing query parameters.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise that resolves when the page retrieval is complete.
 */
const page = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {

    const modelKeys: string[] = Object.keys(model.schema.obj); // Get all schema field names for filtering (used later to exclude soft-deleted documents)

    const { autopopulate, binMode, filters, sort, pagination }: PageRequestBody = await JoiSchemaValidator(pageRequestBodySchema, req.body, { allowUnknown: false, abortEarly: false }, "Dynamic page request API.");

    const skip: number = (pagination.page * pagination.limit) - pagination.limit; // Calculate the skip value based on page and limit for pagination

    const requestFilters = transformMongoQueryFilter(filters); // transform filters object from request as per mongoDb requirements

    const requestSort = transformMongoQuerySort(sort); // transform sort object from request as per mongoDb requirements

    const filterQuery: FilterQuery<any> = { $and: [] } // mongoDB filter query initalizes with $and empty array

    // If the schema includes the 'isDeleted' field, exclude soft-deleted documents from the query
    if (modelKeys.includes('isDeleted') && filterQuery?.$and)
        filterQuery.$and.push({ isDeleted: binMode })

    // convert requestFilters object (key, value) pairs into array of objects {key: value}[] and push it to $and query
    Object.entries(requestFilters).map(([key, value]) => {
        filterQuery.$and?.push({ [key]: value, })
    });

    if (filterQuery?.$and && filterQuery.$and?.length <= 0) {
        delete filterQuery.$and
    };
    
    // Create separate promises for fetching documents and total count for efficiency
    const resultsPromise = model
        .find(filterQuery, { __v: 0 }, { autopopulate: autopopulate }) // Find documents with specific fields, exclude `__v`, and optionally autopopulate
        .sort(requestSort) // Apply the sorting criteria
        .skip(skip) // Skip documents based on calculated skip value
        .limit(pagination.limit) // Limit the number of documents returned
        .exec();

    // Count total documents matching the query
    const countPromise = model.countDocuments(filterQuery).exec();

    // Wait for both promises to resolve concurrently
    const [results, count] = await Promise.all([resultsPromise, countPromise]);
    // Build the page response object using a separate utility function
    const page: PageResult = await pageResponseBuilder(results, pagination.page, pagination.limit, count, sort);
    // Return the paginated response with status code 200 (OK)
    return res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            page,
            `Page fetched successfully`,
            `${model.modelName.toLowerCase()}.page`,
            req.url,
            null,
            HttpCodes.OK, req, res)
    );

};

export default page;