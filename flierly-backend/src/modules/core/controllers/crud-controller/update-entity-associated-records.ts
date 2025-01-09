import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import getDiffFromArrayOfNumbers from '@/utils/get-diff-from-array-of-numbers.util';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { UpdateAssociatedEntityRecordsRequestBody } from '../../@types/request-data.types';
import updateAssociatedEntityRecordsRequestBodySchema from '../../validation-schemas/update-associated-entity-records-request-body-schema';
import crudService from '../../services/crud-service';

/**
 * Update associated records of an entity.
 * @param entity - The entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the update result.
 */
const updateAssociatedEntityRecords = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response> => {
  // Validate request body
  const reqBody: UpdateAssociatedEntityRecordsRequestBody = await JoiSchemaValidator(
    updateAssociatedEntityRecordsRequestBodySchema,
    req.body,
    { abortEarly: false },
    'CRUDController.updateAssociatedEntityRecords',
  );


  const result = await crudService.updateAssociatedEntityRecords(entity, reqBody);

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: result[0],
      message: result[1],
      controller: 'CRUD.UpdateArrayFieldController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default updateAssociatedEntityRecords;
