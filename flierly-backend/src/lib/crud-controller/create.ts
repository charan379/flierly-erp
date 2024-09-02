import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api-response.generator";
import { Request, Response } from "express";
import mongoose from "mongoose";


/**
 * Creates a new document in the specified Mongoose model.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection to create in.
 * @param {Request} req The Express request object containing the request body.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise that resolves when a http response.
 */
const create = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    const result = await model.create({ ...req.body });
    return res.status(HttpCodes.CREATED).json(
        apiResponse(
            true,
            result,
            `Data inserted successfully`,
            `${model.modelName.toLowerCase()}.create`,
            req.url,
            null,
            HttpCodes.OK, req, res)
    );
}

export default create;