import HttpCodes from "@/constants/httpCodes";
import { updateManyBodySchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import { Request, Response } from "express";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";

/**
 * Performs update of active or inactive on multiple documents in the specified Mongoose model.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection.
 * @param {Request} req The Express request object containing the document IDs in the body.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise resolving with a successful updated response or a not found response.
 */
const activate = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate the request body
    const reqBody: { ids: mongoose.ObjectId[], action: 'activate' | 'inactivate' } = await JoiSchemaValidator(updateManyBodySchema, req.body, { abortEarly: false }, "dynamic-activate");

    let updates = { isActive: true };

    switch (reqBody.action) {
        case 'inactivate': {
            updates = { isActive: false };
            break;
        };
        case 'activate': {
            updates = { isActive: true };
            break;
        };
        default: {
            updates = { isActive: true };
            break;
        }
    }
    // Update the documents with soft delete flags
    const result = await model.updateMany(
        { _id: { $in: reqBody.ids }, isDeleted: false, isActive: !updates.isActive },
        { $set: updates },
        { new: true }
    ).exec();

    if (result.modifiedCount > 0) {
        return res.status(HttpCodes.OK).json(
            apiResponse(
                true,
                result,
                `${result.modifiedCount} ${model.modelName}${result.modifiedCount > 1 ? "'s" : ""} ${reqBody.action}d successfully !`,
                `${model.modelName.toLowerCase()}.activate`,
                req.url,
                null,
                HttpCodes.OK, req, res)
        );
    }

    // No documents found, return not found response
    throw new FlierlyException(`No documents found with given id${reqBody.ids.length > 1 ? "'s" : ""}`, HttpCodes.BAD_REQUEST, '', '');
};

export default activate;
