import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testTypeORMActivate = async (req: Request, res: Response): Promise<Response> => {
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-activate');

  const repo = AppDataSource.getRepository('Role');

  const result = await repo.createQueryBuilder().update().set({ isActive: true }).where('id IN (:...ids)', { ids: validatedIds }).execute();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: 'Activated successfully',
      controller: 'misc.ActivateRoleController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMActivate;
