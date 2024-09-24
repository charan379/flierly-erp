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
    propertyName: string;
    newArray: number[];
}

const updateArrayFieldRequestBodySchema: Joi.ObjectSchema<UpdateArrayFieldRequestBody> = Joi.object({
    id: idSchema,
    propertyName: Joi.string().required().messages({
        'any.required': 'The "propertyName" field is required.',
    }),
    newArray: idArraySchema,
});

const updateArrayField = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { id, newArray, propertyName }: UpdateArrayFieldRequestBody = await JoiSchemaValidator(
        updateArrayFieldRequestBodySchema,
        req.body,
        { abortEarly: false },
        "dynamic-update-array-field-controller"
    )

    const repo = AppDataSource.getRepository(entity);

    const relationColumns = repo.metadata.relations.reduce((acc: Record<string, any>, column) => {
        acc[column.propertyName] = column.relationType;
        return acc;
    }, {});
    console.log(relationColumns)

    if (!Object.keys(relationColumns).includes(propertyName)) {
        throw new FlierlyException(`${propertyName} does not exist in ${entity.toString()}`, HttpCodes.BAD_REQUEST);
    }

    if (relationColumns[propertyName] !== 'many-to-many') {
        throw new FlierlyException(`${propertyName} is not many-to-many related to ${entity.toString()}`, HttpCodes.BAD_REQUEST);
    }

    const queryBuilder = repo.createQueryBuilder();

    const row = await queryBuilder
        .where("id = :id", { id: id })
        .loadAllRelationIds()
        .getOneOrFail();

    const existingArray: number[] = row[propertyName];

    const { newEntries: itemsToAdd, removedEntries: itemsToRemove } = compareNumberArrays(existingArray, newArray);

    await AppDataSource.transaction(async (entityManager) => {
        const transactionRepo = entityManager.getRepository(entity);

        await transactionRepo
            .createQueryBuilder()
            .relation(propertyName)
            .of(id)
            .addAndRemove(itemsToAdd, itemsToRemove);
    });

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: `Added ${itemsToAdd.length} and removed ${itemsToRemove.length} from ${propertyName}.`,
        message: 'Updated successfully',
        controller: 'CRUD.UpdateArrayFieldController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default updateArrayField;