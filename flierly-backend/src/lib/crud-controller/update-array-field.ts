import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";
import compareObjectIdArrays from "@/utils/compare-objectid-arrays.util";

interface UpdateArrayFieldRequestBody {
    id: mongoose.ObjectId;
    fieldPath: string;
    dataType: "string" | "object" | "objectId";
    newArray: any[];
}

const updateArrayFieldRequestBodySchema: Joi.ObjectSchema<UpdateArrayFieldRequestBody> = Joi.object({
    id: objectIdSchema.required().messages({
        'any.required': 'The "id" field is required.',
    }),
    fieldPath: Joi.string().required().messages({
        'any.required': 'The "fieldPath" field is required.',
    }),
    dataType: Joi.string()
        .valid('string', 'object', 'objectId')
        .example('string')
        .required()
        .messages({
            'any.only': 'The "dataType" must be one of [string, object, objectId].',
            'any.required': 'The "dataType" field is required.',
        }),
    newArray: Joi.array().required().messages({
        'any.required': 'The "newArray" field is required.',
    }),
});

const updateArrayField = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // console.time('updateArrayField');

    // Validate request body
    const { id, fieldPath, dataType, newArray }: UpdateArrayFieldRequestBody = await JoiSchemaValidator(
        updateArrayFieldRequestBodySchema,
        req.body,
        { allowUnknown: false, abortEarly: false },
        "Dynamic update array field controller"
    );

    // Ensure fieldPath exists in schema
    if (!model.schema.paths[fieldPath]) {
        throw new FlierlyException(`${fieldPath} does not exist in ${model.modelName.toLowerCase()}`, HttpCodes.BAD_REQUEST);
    }

    // Fetch the existing document
    const existingDocument = await model.findById(id, { _v: 0 }, { autopopulate: false })
        .where("isDeleted", false)
        .select(fieldPath)
        .exec();

    if (!existingDocument) {
        throw new FlierlyException('No documents found with given id', HttpCodes.BAD_REQUEST);
    }

    const existingArray: any[] = existingDocument[fieldPath] || [];

    // Ensure only objectId is processed
    if (dataType !== 'objectId') {
        throw new FlierlyException('Update of non-objectId fields is not supported', HttpCodes.BAD_REQUEST);
    }

    // Process arrays for comparison
    const { newEntries: itemsToAdd, removedEntries: itemsToRemove } = compareObjectIdArrays(existingArray, newArray);

    // Determine if there are any updates to perform
    if (itemsToAdd.length === 0 && itemsToRemove.length === 0) {
        // console.timeEnd('updateArrayField');
        return res.status(HttpCodes.OK).json(
            apiResponse(
                true,
                existingDocument,
                'No changes to update.',
                `${model.modelName.toLowerCase()}.updateArrayField`,
                req.url,
                null,
                HttpCodes.OK, req, res
            )
        );
    }

    // Start session and transaction if there are updates
    // console.time('updateDB');
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (itemsToRemove.length > 0) {
            await model.updateOne(
                { _id: id },
                { $pull: { [fieldPath]: { $in: itemsToRemove } } },
                { session }
            );
        }

        if (itemsToAdd.length > 0) {
            await model.updateOne(
                { _id: id },
                { $addToSet: { [fieldPath]: { $each: itemsToAdd } } },
                { session }
            );
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
        // console.timeEnd('updateDB');
    }

    // Fetch updated document
    const result = await model.findById(id, {}, { autopopulate: false }).exec();

    // console.timeEnd('updateArrayField');

    return res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            result,
            `Added ${itemsToAdd.length} and removed ${itemsToRemove.length} from ${fieldPath}.`,
            `${model.modelName.toLowerCase()}.updateArrayField`,
            req.url,
            null,
            HttpCodes.OK, req, res
        )
    );
};

export default updateArrayField;
