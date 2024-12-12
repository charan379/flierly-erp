import HttpCodes from "@/constants/httpCodes";
import { idArraySchema, idSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import FlierlyException from "@/lib/flierly.exception";
import apiResponse from "@/utils/api/responseGenerator";
import compareNumberArrays from "@/utils/compareNumberArrays";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

interface UpdateArrayFieldRequestBody {
    id: number;
    relationField: string;
    newArray?: number[];
    addOne?: number;
    removeOne?: number;
    addMultiple?: number[];
    removeMultiple?: number[];
}

const updateArrayFieldRequestBodySchema: Joi.ObjectSchema<UpdateArrayFieldRequestBody> = Joi.object({
    id: idSchema,
    relationField: Joi.string().required().messages({
        'any.required': 'The "relationField" is required.',
    }),
    newArray: idArraySchema.optional(),
    addOne: Joi.number().optional(),
    removeOne: Joi.number().optional(),
    addMultiple: idArraySchema.optional(),
    removeMultiple: idArraySchema.optional(),
});

const updateArrayField = async (
    entity: EntityTarget<ObjectLiteral>,
    req: Request,
    res: Response
): Promise<Response> => {
    // Validate request body
    const { id, relationField, newArray, addOne, removeOne, addMultiple, removeMultiple }: UpdateArrayFieldRequestBody = await JoiSchemaValidator(
        updateArrayFieldRequestBodySchema,
        req.body,
        { abortEarly: false },
        "dynamic-update-array-field-controller"
    );

    const repo = AppDataSource.getRepository(entity);

    // Fetch relation columns and validate the field
    const relationColumns = repo.metadata.relations.reduce((acc: Record<string, any>, column) => {
        acc[column.propertyName] = column.relationType;
        return acc;
    }, {});

    if (!Object.keys(relationColumns).includes(relationField)) {
        throw new FlierlyException(`${relationField} does not exist in ${entity.toString()}`, HttpCodes.BAD_REQUEST);
    }

    if (relationColumns[relationField] !== "many-to-many") {
        throw new FlierlyException(`${relationField} is not many-to-many related to ${entity.toString()}`, HttpCodes.BAD_REQUEST);
    }

    // Fetch the current field data with relations loaded
    const queryBuilder = repo.createQueryBuilder();
    const row = await queryBuilder.where("id = :id", { id }).loadAllRelationIds().getOneOrFail();

    const existingArray: number[] = row[relationField] ?? [];

    // Compute additions and removals based on request
    let itemsToAdd: number[] = [];
    let itemsToRemove: number[] = [];

    if (newArray) {
        // Sync array with newArray
        const compareResult = compareNumberArrays(existingArray, newArray);
        itemsToAdd = compareResult.newEntries;
        itemsToRemove = compareResult.removedEntries;
    } else {
        // Handle individual and batch updates
        if (addOne && !existingArray.includes(addOne)) itemsToAdd.push(addOne); // Add if not already present
        if (removeOne && existingArray.includes(removeOne)) itemsToRemove.push(removeOne); // Remove if exists

        if (addMultiple) {
            itemsToAdd.push(...addMultiple.filter((item) => !existingArray.includes(item))); // Filter items not already present
        }

        if (removeMultiple) {
            itemsToRemove.push(...removeMultiple.filter((item) => existingArray.includes(item))); // Filter items that exist
        }

        // Ensure no duplicates in operations
        itemsToAdd = [...new Set(itemsToAdd)];
        itemsToRemove = [...new Set(itemsToRemove)];
    }

    // Execute transaction for updates
    await AppDataSource.transaction(async (entityManager) => {
        const transactionRepo = entityManager.getRepository(entity);

        await transactionRepo
            .createQueryBuilder()
            .relation(relationField)
            .of(id)
            .addAndRemove(itemsToAdd, itemsToRemove);
    });

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: `Updates for entity ${entity.toString()} (ID: ${id}, Relation: ${relationField}): Added IDs: ${itemsToAdd.join(", ") || "none"}, Removed IDs: ${itemsToRemove.join(", ") || "none"}.`,
        message: `Updated ${relationField}: ${itemsToAdd.length} added, ${itemsToRemove.length} removed.`,
        controller: "CRUD.UpdateArrayFieldController",
        httpCode: HttpCodes.OK,
        error: null,
        req,
        res,
    }));
};

export default updateArrayField;
