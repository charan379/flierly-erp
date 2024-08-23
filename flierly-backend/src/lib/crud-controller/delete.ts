import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";

/**
 * Performs a soft delete on a document in the specified Mongoose model.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection.
 * @param {Request} req The Express request object containing the document ID in params.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise resolving with a successful deletion response or a not found response.
 */
const softDelete = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate the request parameter
    const validatedId = await JoiSchemaValidator(objectIdSchema, req.params.id, {}, "dynamic-delete");

    // Find and update the document with soft delete flags
    const updatedDocument = await model.findOneAndUpdate(
        { _id: validatedId, isDeleted: false },
        { $set: { isDeleted: true, isActive: false } },
        { new: true }
    ).exec();

    if (updatedDocument) {
        return res.status(HttpCodes.OK).json(
            apiResponse(
                true,
                updatedDocument,
                `${model.modelName} deleted successfully !`,
                `${model.modelName.toLowerCase()}.delete`,
                req.url,
                null,
                HttpCodes.OK)
        );
    }

    // No document found, return not found response
    throw new FlierlyException('No documents found with given id', HttpCodes.BAD_REQUEST, '', '');
};

export default softDelete;
