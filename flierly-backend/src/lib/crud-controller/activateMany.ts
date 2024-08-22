import HttpCodes from "@/constants/httpCodes";
import { updateManyBodySchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";

/**
 * Performs update of active or inactive on multiple documents in the specified Mongoose model.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection.
 * @param {Request} req The Express request object containing the document IDs in the body.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise resolving with a successful updated response or a not found response.
 */
const activateMany = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate the request body
    const reqBody: { ids: mongoose.ObjectId[], action: 'activate' | 'inactivate' } = await JoiSchemaValidator(updateManyBodySchema, req.body, { abortEarly: false }, "dynamic-activate-many");

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
                `${result.modifiedCount} ${model.modelName}'s ${reqBody.action}d successfully !`,
                `${model.modelName.toLowerCase()}.activateMany`,
                req.url,
                null,
                HttpCodes.OK)
        );
    }

    // No documents found, return not found response
    throw new FlierlyException('No documents found with given ids', HttpCodes.BAD_REQUEST, '', '');
};

export default activateMany;
