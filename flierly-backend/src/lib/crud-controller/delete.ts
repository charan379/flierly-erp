import HttpCodes from "@/constants/httpCodes";
import { objectIdArraySchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";

/**
 * Performs a soft delete on multiple documents in the specified Mongoose model.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection.
 * @param {Request} req The Express request object containing the document IDs in body.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise resolving with a successful deletion response or a not found response.
 */
const softDelete = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate the request body
    const validatedIds: mongoose.ObjectId[] = await JoiSchemaValidator(objectIdArraySchema, req.body, {}, "dynamic-delete");

    // Find and update the documents with soft delete flags
    const result = await model.updateMany(
        { _id: { $in: validatedIds }, isDeleted: false },
        { $set: { isDeleted: true, isActive: false } },
        { new: true }
    ).exec();

    if (result.modifiedCount > 0) {
        return res.status(HttpCodes.OK).json(
            apiResponse(
                true,
                result,
                `${result.modifiedCount} ${model.modelName}${result.modifiedCount > 1 ? "'s" : ""} deleted successfully !`,
                `${model.modelName.toLowerCase()}.delete`,
                req.url,
                null,
                HttpCodes.OK, req, res)
        );
    }

    // No documents found, return not found response
    throw new FlierlyException(`No documents found with given id${validatedIds?.length > 1}`, HttpCodes.BAD_REQUEST, '', '');
};

export default softDelete;
