import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";

/**
 * Updates a document in the specified Mongoose model based on the provided ID and request body.
 *
 * @param {mongoose.Model<any>} model The Mongoose model to update
 * @param {Request} req The Express request object containing the ID and update data
 * @param {Response} res The Express response object for sending the update response
 * @returns {Promise<Response>} Resolves to the updated document if successful, otherwise undefined
 */
const update = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Extract updates from the request body
    let updates = req.body;

    // Prevent modification of `isDeleted` and `_id` fields
    delete updates.isDeleted;
    delete updates._id;

    // Validate the ID parameter using the objectIdSchema
    const id = await JoiSchemaValidator(objectIdSchema, req.params.id, {}, "dynamic-update");

    // Perform the update using Mongoose's findOneAndUpdate method
    const result = await model.findOneAndUpdate(
        {
            _id: id, // Use validated ID for safe update
            isDeleted: false, // Ensure the document is not marked as deleted
        },
        { $set: updates },
        {
            new: true, // Return the updated document
            runValidators: true, // Apply validation before saving
        }
    ).exec();

    if (result) {
        // Update successful, send the updated document
        return res.status(HttpCodes.OK).json(result);
    }

    // No document found with the given ID
    return res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` });
};

export default update;