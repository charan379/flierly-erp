import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import isEntityRecordExistsRequestBodySchema from '../../validation-schemas/is-entity-record-exists-request-body-schema';
import crudService from '../../services/crud-service';
import { IsEntityRecordExistsRequestBody } from '../../@types/request-data.types';

/**
 * Check if an entity exists in the database.
 * @param entity - The entity to check.
 * @param req - The request object.
 * @param res - The response object.
 * @returns Whether the entity exists.
 */
const isExists = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {
    const reqBody: IsEntityRecordExistsRequestBody = await JoiSchemaValidator(isEntityRecordExistsRequestBodySchema, req.body, { abortEarly: false }, 'CRUDController.is-exists');

    const result = await crudService.isEntityExists(entity, reqBody);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        controller: 'CRUD.ExistsController',
        message: 'Exists fetched successfully',
        httpCode: HttpCodes.OK,
        error: null,
        req,
        res,
      }),
    );
  } catch (error) {

    next(error);

  }
};

export default isExists;
