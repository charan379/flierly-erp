import HttpCodes from "@/constants/httpCodes";
import { objectIdSchema } from "@/joi-schemas/common.joi.schemas";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";
import FlierlyException from "../flierly.exception";

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

// Utility function to handle ObjectId and strings
const processItem = (item: any) => {
    if (mongoose.isValidObjectId(item)) {
        return new mongoose.Types.ObjectId(item as string); // Convert to ObjectId if valid
    } else if (typeof item === 'object' && item._id) {
        return mongoose.isValidObjectId(item._id) ? new mongoose.Types.ObjectId(item._id as string) : item._id; // Use ObjectId or string _id
    }
    return item; // Return as string if not an object or ObjectId
};

const updateArrayField = async (model: mongoose.Model<any>, req: Request, res: Response): Promise<Response> => {
    // Validate request body
    const { id, fieldPath, dataType, newArray }: UpdateArrayFieldRequestBody = await JoiSchemaValidator(
        updateArrayFieldRequestBodySchema,
        req.body,
        { allowUnknown: false, abortEarly: false },
        "Dynamic update array field controller"
    );

    const schemaPaths = model.schema.paths;

    if (!schemaPaths[fieldPath])
        throw new FlierlyException(`${fieldPath} does not exist in ${model.modelName.toLowerCase()}`, HttpCodes.BAD_REQUEST, '', '');

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Fetch the existing document
        const existingDocument = await model.findById(id, { _v: 0 }, { session, autopopulate: false })
            .where("isDeleted", false)
            .select(fieldPath)
            .exec();

        if (!existingDocument)
            throw new FlierlyException('No documents found with given id', HttpCodes.BAD_REQUEST, '', '');

        const existingArray: any[] = existingDocument[fieldPath] || [];

        // Process newArray items to ensure they are ObjectId or strings
        const processedNewArray = Array.isArray(newArray) ? newArray.map(processItem).filter(Boolean) : [];

        // Calculate items to add (new items not in existing array)
        const itemsToAdd = processedNewArray.filter(item => !existingArray.includes(item));

        // Calculate items to remove (items in existing array but not in the new array)
        const itemsToRemove = existingArray.filter(item => !processedNewArray.includes(item));

        // Perform $pull operation separately if needed
        if (itemsToRemove.length > 0) {
            await model.findByIdAndUpdate(id, {
                $pull: { [fieldPath]: { $in: itemsToRemove } }
            }, { session, autopopulate: false });
        }

        // Perform $addToSet operation separately if needed
        if (itemsToAdd.length > 0) {
            await model.findByIdAndUpdate(id, {
                $addToSet: { [fieldPath]: { $each: itemsToAdd } }
            }, { session, autopopulate: false });
        }

        const result = await model.findById(id, {}, { session, autopopulate: false }).exec();

        await session.commitTransaction();
        session.endSession();

        return res.status(HttpCodes.OK).json(
            apiResponse(
                true,
                result,
                `Added ${itemsToAdd.length} and removed ${itemsToRemove.length} ${fieldPath}.`,
                `${model.modelName.toLowerCase()}.updateArrayField`,
                req.url,
                null,
                HttpCodes.OK, req, res
            )
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export default updateArrayField;
