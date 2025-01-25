import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';

/**
 * Soft delete entities in the database.
 * @param entity - The entity to soft delete.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the soft delete result.
 */
const softDelete = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate the IDs to soft delete
    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'CRUDController.delete');

    const result = await crudService.deleteEntityRecords(entity, validatedIds);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${result.affected} ${typeof entity === "function" ? entity.name : entity}'s deleted successfully.`,
        controller: 'CRUDController.delete',
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

export default softDelete;
