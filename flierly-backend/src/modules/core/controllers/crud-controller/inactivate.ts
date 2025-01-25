import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';

/**
 * Inactivate entities in the database.
 * @param entity - The entity to inactivate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the inactivate result.
 */
const inactivate = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate the IDs to inactivate
    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, { abortEarly: false }, 'CRUDController.inactivate');

    const result = await crudService.inActivateEntityRecords(entity, validatedIds);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${result.affected} ${typeof entity === "function" ? entity.name : entity}'s inactivated successfully.`,
        controller: 'CRUDController.inactivate',
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

export default inactivate;
