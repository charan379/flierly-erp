import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";

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
        return res.status(HttpCodes.OK).json(updatedDocument);
    }

    // No document found, return not found response
    return res.status(HttpCodes.NOT_FOUND).json({ message: "Document not found" });
};

export default softDelete;
