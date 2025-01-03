import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema, idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import getDiffFromArrayOfNumbers from '@/utils/get-diff-from-array-of-numbers.util';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';

interface UpdateAssociatedEntityRecordsRequestBody {
  entityRecordId: number;
  entitySideField: string;
  newArray?: number[];
  addOne?: number;
  removeOne?: number;
  addMultiple?: number[];
  removeMultiple?: number[];
}

const updateAssociatedEntityAssociatedRecordsRequestBodySchema: Joi.ObjectSchema<UpdateAssociatedEntityRecordsRequestBody> = Joi.object({
  entityRecordId: idSchema,
  entitySideField: Joi.string().required().messages({
    'any.required': 'The "inverseField" is required.',
  }),
  newArray: idArraySchema.optional(),
  addOne: Joi.number().optional(),
  removeOne: Joi.number().optional(),
  addMultiple: idArraySchema.optional(),
  removeMultiple: idArraySchema.optional(),
});

/**
 * Update associated records of an entity.
 * @param entity - The entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the update result.
 */
const updateAssociatedEntityRecords = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate request body
  const { entityRecordId, entitySideField, newArray, addOne, removeOne, addMultiple, removeMultiple }: UpdateAssociatedEntityRecordsRequestBody = await JoiSchemaValidator(
    updateAssociatedEntityAssociatedRecordsRequestBodySchema,
    req.body,
    { abortEarly: false },
    'dynamic-update-array-field-controller',
  );

  const repo = AppDataSource.getRepository(entity);

  // Fetch relation columns and validate the entitySide field
  const entitySideFieldMetadata = repo.metadata.relations.reduce((acc: Record<string, any>, column) => {
    acc[column.propertyName] = column.relationType;
    return acc;
  }, {});

  if (!Object.keys(entitySideFieldMetadata).includes(entitySideField)) {
    throw new FlierlyException(`${entitySideField} does not exist in ${entity.toString()}`, HttpCodes.BAD_REQUEST);
  }

  if (entitySideFieldMetadata[entitySideField] !== 'many-to-many') {
    throw new FlierlyException(`${entitySideField} is not many-to-many related to ${entity.toString()}`, HttpCodes.BAD_REQUEST);
  }

  // Fetch the current field data with relations loaded
  const queryBuilder = repo.createQueryBuilder();
  const entityRecord = await queryBuilder.where('id = :id', { id: entityRecordId }).loadAllRelationIds().getOneOrFail();

  const existingArray: number[] = entityRecord[entitySideField] ?? [];

  // Compute additions and removals based on request
  let idsToAdd: number[] = [];
  let idsToRemove: number[] = [];

  if (newArray) {
    // Sync array with newArray
    const compareResult = getDiffFromArrayOfNumbers(existingArray, newArray);
    idsToAdd = compareResult.newEntries;
    idsToRemove = compareResult.removedEntries;
  } else {
    // Handle individual and batch updates
    if (addOne && !existingArray.includes(addOne)) idsToAdd.push(addOne); // Add if not already present
    if (removeOne && existingArray.includes(removeOne)) idsToRemove.push(removeOne); // Remove if exists

    if (addMultiple) {
      idsToAdd.push(...addMultiple.filter((item) => !existingArray.includes(item))); // Filter items not already present
    }

    if (removeMultiple) {
      idsToRemove.push(...removeMultiple.filter((item) => existingArray.includes(item))); // Filter items that exist
    }

    // Ensure no duplicates in operations
    idsToAdd = [...new Set(idsToAdd)];
    idsToRemove = [...new Set(idsToRemove)];
  }

  // Execute transaction for updates
  await AppDataSource.transaction(async (entityManager) => {
    const transactionRepo = entityManager.getRepository(entity);

    await transactionRepo.createQueryBuilder().relation(entitySideField).of(entityRecordId).addAndRemove(idsToAdd, idsToRemove);
  });

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: `Updates for entity ${entity.toString()} (ID: ${entityRecordId}, Relation: ${entitySideField}): Added IDs: ${idsToAdd.join(', ') || 'none'}, Removed IDs: ${idsToRemove.join(', ') || 'none'}.`,
      message: `Updated ${entitySideField}: ${idsToAdd.length} added, ${idsToRemove.length} removed.`,
      controller: 'CRUD.UpdateArrayFieldController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default updateAssociatedEntityRecords;
