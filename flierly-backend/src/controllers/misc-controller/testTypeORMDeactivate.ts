import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testTypeORMDeactivate = async (req: Request, res: Response): Promise<Response> => {
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-deactivate');

  const repo = AppDataSource.getRepository('Role');

  const result = await repo.createQueryBuilder().update().set({ isActive: false }).where('id IN (:...ids)', { ids: validatedIds }).execute();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: 'Deactivated successfully',
      controller: 'misc.DeactivateRoleController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMDeactivate;
