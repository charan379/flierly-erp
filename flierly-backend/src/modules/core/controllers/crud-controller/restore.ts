import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '../../services/crud-service';

/**
 * Restore soft-deleted entities in the database.
 * @param entity - The entity to restore.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the restore result.
 */
const restore = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {
    // Validate the IDs to restore
    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'CRUDController.restore');

    const result = await crudService.restoreEntityRecords(entity, validatedIds);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${result.affected} ${entity}'s restored successfully.`,
        controller: 'CRUDController.restore',
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

export default restore;
