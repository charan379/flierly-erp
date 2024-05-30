import HttpCodes from "@/constants/httpCodes";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import buildMongoQuery from "@/utils/mongo-query.builder";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";

/**
 * Interface representing the structure of the request for the exists API.
 * 
 * @type {Object} ExistsRequest
 * @property {string} fields - Comma-separated list of fields to search on.
 * @property {string} queries - Comma-separated list of queries to match against the fields.
 */
export interface ExistsRequest {
    fields: string;
    queries: string;
}

/**
 * Joi schema for validating the `ExistsRequest` object.
 * 
 * @type {Joi.ObjectSchema<ExistsRequest>}
 */
const existsRequestSchema: Joi.ObjectSchema<ExistsRequest> = Joi.object({
    fields: Joi.string().default("name"), // Default field to search on
    queries: Joi.string().default(" "), // Default empty string for queries
});

/**
 * Checks if a document exists in the specified Mongoose model based on provided fields and queries.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection to search in.
 * @param {Request} req The Express request object containing query parameters.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise that resolves when the existence check is complete.
 */
const exists = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate the request parameters using the defined schema
    const existsRequest: ExistsRequest = await JoiSchemaValidator(existsRequestSchema, req.query, { allowUnknown: false, abortEarly: false }, "Dynamic Exists API");

    // Split the comma-separated fields and queries into arrays
    const fields = existsRequest.fields.split(",");
    const queries = existsRequest.queries.split(",");

    // Build a MongoDB query using the provided fields and queries
    const mongoQuery = buildMongoQuery(fields, queries, true);

    // Find documents matching the query, exclude soft-deleted ones, and count them efficiently
    const result = await model.find({ $or: mongoQuery }, { __v: 0 })
        .where("isDeleted", false)
        .countDocuments()
        .exec();

    // Respond with an object indicating document existence
    return res.status(HttpCodes.OK).json({ exists: result > 0 ? true : false });
};

export default exists;