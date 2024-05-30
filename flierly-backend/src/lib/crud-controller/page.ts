import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import pageResponseBuilder from "@/utils/page-response.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

/**
 * Interface representing the structure of a page request.
 * 
 * @type {Object} PageRequest
 * @property {string} fields - Comma-separated list of fields to search on.
 * @property {string} queries - Comma-separated list of queries to match against the fields.
 * @property {string} sort - Sorting criteria in the format "field.direction" (e.g., "createdAt.asc").
 * @property {number} page - The requested page number (defaults to 1).
 * @property {number} limit - The number of documents to retrieve per page (defaults to 20).
 * @property {boolean} autopopulate - Whether to automatically populate referenced documents (defaults to false).
 */
export interface PageRequest {
    fields: string;
    queries: string;
    sort: string;
    page: number;
    limit: number;
    autopopulate: boolean;
}

/**
 * Joi schema for validating the `PageRequest` object.
 * 
 * @type {Joi.ObjectSchema<PageRequest>}
 */
const pageRequestSchema: Joi.ObjectSchema<PageRequest> = Joi.object({
    fields: Joi.string().default("name"),
    queries: Joi.string().default(" "),
    sort: Joi.string().default("createdAt.asc"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(20),
    autopopulate: Joi.boolean().default(false),
});

/**
 * Fetches a paginated list of documents from a Mongoose model based on provided criteria.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection to search in.
 * @param {Request} req The Express request object containing query parameters.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise that resolves when the page retrieval is complete.
 */
const page = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<void> => {
    // Get all schema field names for filtering (used later to exclude soft-deleted documents)
    const modelKeys: string[] = Object.keys(model.schema.obj);
    // Validate the request parameters using the defined schema
    const pageRequest: PageRequest = await JoiSchemaValidator(pageRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic page request API.");
    // Build the MongoDB query using provided fields and queries
    let query: MongoQueryArray = buildMongoQuery(pageRequest.fields.split(","), pageRequest.queries.split(","));
    // Build the sort object from the request parameter
    const sort: SortObject = buildMongoSortObject(pageRequest.sort);
    // Extract page number and limit from request
    const page: number = pageRequest.page;
    const limit: number = pageRequest.limit;
    // Calculate the skip value based on page and limit for pagination
    const skip: number = (page * limit) - limit;

    // If the schema includes the 'isDeleted' field, exclude soft-deleted documents from the query
    if (modelKeys.includes('isDeleted'))
        query.push({ isDeleted: false })

    // Create separate promises for fetching documents and total count for efficiency
    const resultsPromise = model
        .find({ $and: query }, { __v: 0 }, { autopopulate: pageRequest.autopopulate }) // Find documents with specific fields, exclude `__v`, and optionally autopopulate
        .sort({ ...sort }) // Apply the sorting criteria
        .skip(skip) // Skip documents based on calculated skip value
        .limit(limit) // Limit the number of documents returned
        .exec();

    const countPromise = model.countDocuments({ $and: query }) // Count total documents matching the query
        .exec();

    // Wait for both promises to resolve concurrently
    const [results, count] = await Promise.all([resultsPromise, countPromise]);

    // Build the page response object using a separate utility function
    const re: PageResult = await pageResponseBuilder(results, page, limit, count, sort);

    // Return the paginated response with status code 200 (OK)
    res.status(HttpCodes.OK).json(re);
};

export default page;