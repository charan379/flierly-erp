import HttpCodes from '@/constants/http-codes.enum';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { EntityReadRequestBody } from '../../@types/request-data.types';
import entityReadRequestBodySchema from '../../validation-schemas/entity-read-request-body-schema';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import crudService from '../../services/crud-service';

/**
 * Read an entity from the database.
 * @param entity - The entity to read.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the read entity.
 */
const read = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {
    // Validate the request body
    const reqBody: EntityReadRequestBody = await JoiSchemaValidator<EntityReadRequestBody>(entityReadRequestBodySchema, req.body, { abortEarly: false }, 'CRUDController.read');

    const data = await crudService.readEntityRecord(entity, reqBody);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result: data,
        message: 'Data fetched successfully',
        controller: 'CRUDController.read',
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

export default read;
