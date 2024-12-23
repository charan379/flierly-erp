import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

/**
 * Activate entities in the database.
 * @param entity - The entity to activate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the activate result.
 */
const activate = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate the IDs to activate
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-activate');

  const repo = AppDataSource.getRepository(entity);

  // Activate the entities with the validated IDs
  const result = await repo.createQueryBuilder().update().set({ isActive: true }).where('id IN (:...ids)', { ids: validatedIds }).execute();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: `${result.affected} ${repo.metadata.name}'s activated successfully.`,
      controller: 'CRUD.ActivateController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default activate;
