import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import mongoose from "mongoose";

/**
 * Fetches a single document from a Mongoose model based on the provided ID.
 *
 * @param {mongoose.Model<any>} model The Mongoose model representing the collection to search in.
 * @param {Request} req The Express request object containing route parameters.
 * @param {Response} res The Express response object for sending the response.
 * @returns {Promise<Response>} A promise that resolves when the document retrieval is complete.
 */
const read = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
  // 1. Get all schema field names for filtering (used later to exclude soft-deleted documents)
  const modelKeys: string[] = Object.keys(model.schema.obj);

  // 2. Build the initial query object with validated ID
  let query: { _id: mongoose.ObjectId, isDeleted?: boolean } = {
    _id: await JoiSchemaValidator(objectIdSchema, req.params.id, {}, "dynamic-read"),
  };

  // 3. If the schema includes the 'isDeleted' field, exclude soft-deleted documents from the query
  if (modelKeys.includes('isDeleted')) {
    query = { ...query, isDeleted: false };
  }

  // 4. Find a single document matching the query criteria with optional population and version exclusion
  const result = await model.findOne(query, { __v: 0 }, { autopopulate: req?.query?.autopopulate === 'true' ? true : false }).exec();

  // 5. Document found, return it with status code 200 (OK)
  if (result) {
    return res.status(HttpCodes.OK).json(result);
  }
  // 6. Handle document not found scenario
  return res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` });
};

export default read;