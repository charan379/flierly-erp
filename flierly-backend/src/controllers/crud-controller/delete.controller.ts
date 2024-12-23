import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

/**
 * Soft delete entities in the database.
 * @param entity - The entity to soft delete.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the soft delete result.
 */
const softDelete = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate the IDs to soft delete
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-soft-delete');

  const result = await AppDataSource.transaction(async (entityManager) => {
    const repo = entityManager.getRepository(entity);

    // Soft delete the entities with the validated IDs
    const updateResult = await repo
      .createQueryBuilder()
      .update()
      .set({
        deletedAt: new Date(), // Set the deletion timestamp
        isActive: false, // Set active to false
      })
      .where('id IN (:...ids)', { ids: validatedIds }) // Specify which IDs to update
      .execute();

    return updateResult; // Return the result of the update operation
  });

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: `${result.affected} ${AppDataSource.getRepository(entity).metadata.name}'s deleted successfully.`,
      controller: 'CRUD.SoftDeleteController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default softDelete;
