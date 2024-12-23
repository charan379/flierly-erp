import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testTypeORMDelete = async (req: Request, res: Response): Promise<Response> => {
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-delete');

  const result = await AppDataSource.transaction(async (entityManager) => {
    const repo = entityManager.getRepository('Role');

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
      message: 'Deleted successfully',
      controller: 'misc.DeleteRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMDelete;
