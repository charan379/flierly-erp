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

interface UpdateEntityAssociatedRecordsRequestBody {
  owningEntityId: number;
  inverseField: string;
  newArray?: number[];
  addOne?: number;
  removeOne?: number;
  addMultiple?: number[];
  removeMultiple?: number[];
}

const updateEntityAssociatedRecordsRequestBodySchema: Joi.ObjectSchema<UpdateEntityAssociatedRecordsRequestBody> = Joi.object({
  owningEntityId: idSchema,
  inverseField: Joi.string().required().messages({
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
 * @param owningEntity - The owning entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the update result.
 */
const updateEntityAssociatedRecords = async (owningEntity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate request body
  const { owningEntityId, inverseField, newArray, addOne, removeOne, addMultiple, removeMultiple }: UpdateEntityAssociatedRecordsRequestBody = await JoiSchemaValidator(
    updateEntityAssociatedRecordsRequestBodySchema,
    req.body,
    { abortEarly: false },
    'dynamic-update-array-field-controller',
  );

  const repo = AppDataSource.getRepository(owningEntity);

  // Fetch relation columns and validate the inverse field
  const inverseFieldMetadata = repo.metadata.relations.reduce((acc: Record<string, any>, column) => {
    acc[column.propertyName] = column.relationType;
    return acc;
  }, {});

  if (!Object.keys(inverseFieldMetadata).includes(inverseField)) {
    throw new FlierlyException(`${inverseField} does not exist in ${owningEntity.toString()}`, HttpCodes.BAD_REQUEST);
  }

  if (inverseFieldMetadata[inverseField] !== 'many-to-many') {
    throw new FlierlyException(`${inverseField} is not many-to-many related to ${owningEntity.toString()}`, HttpCodes.BAD_REQUEST);
  }

  // Fetch the current field data with relations loaded
  const queryBuilder = repo.createQueryBuilder();
  const owningEntityRow = await queryBuilder.where('id = :id', { id: owningEntityId }).loadAllRelationIds().getOneOrFail();

  const existingArray: number[] = owningEntityRow[inverseField] ?? [];

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
    const transactionRepo = entityManager.getRepository(owningEntity);

    await transactionRepo.createQueryBuilder().relation(inverseField).of(owningEntityId).addAndRemove(idsToAdd, idsToRemove);
  });

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: `Updates for owning entity ${owningEntity.toString()} (ID: ${owningEntityId}, Relation: ${inverseField}): Added IDs: ${idsToAdd.join(', ') || 'none'}, Removed IDs: ${idsToRemove.join(', ') || 'none'}.`,
      message: `Updated ${inverseField}: ${idsToAdd.length} added, ${idsToRemove.length} removed.`,
      controller: 'CRUD.UpdateArrayFieldController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default updateEntityAssociatedRecords;
