import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

/**
 * Restore soft-deleted entities in the database.
 * @param entity - The entity to restore.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the restore result.
 */
const restore = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate the IDs to restore
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-restore');

  const repo = AppDataSource.getRepository(entity);

  // Restore the entities with the validated IDs
  const result = await repo.createQueryBuilder().restore().where('id IN (:...ids)', { ids: validatedIds }).execute();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: `${result.affected} ${repo.metadata.name}'s restored successfully.`,
      controller: 'misc.RestoreRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default restore;
