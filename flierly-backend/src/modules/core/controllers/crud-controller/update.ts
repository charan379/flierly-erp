import HttpCodes from '@/constants/http-codes.enum';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';

/**
 * Update an entity in the database.
 * @param entity - The entity to update.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The updated entity.
 */
const update = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate the entity ID and request body
    const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, 'dynamic-update');

    const result = await crudService.updateEntityRecord(entity, id, req.body);
    
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${typeof entity === "function" ? entity.name : entity} updated successfully with ID: ${id}`,
        controller: 'CRUD.UpdateController',
        httpCode: HttpCodes.OK,
        error: null,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default update;
