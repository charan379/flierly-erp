import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';

/**
 * Creates a new entity record in the database.
 *
 * @param entity - The entity class to create an instance of
 * @param req - Express request object containing the entity data in the body
 * @param res - Express response object
 * @returns Promise resolving to Response containing the created entity
 *
 * @throws ValidationError if the entity data fails validation
 * @throws DatabaseError if the entity cannot be saved
 */
const create = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {

    const result = await crudService.createEntityRecord(entity, req.body);

    // Return success response with created entity
    return res.status(HttpCodes.CREATED).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${typeof entity === "function" ? entity.name : entity} created successfully with ID: ${result?.id}`,
        controller: 'CRUDController.create',
        httpCode: HttpCodes.CREATED,
        error: null,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default create;
