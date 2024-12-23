import HttpCodes from '@/constants/http-codes.enum';
import { idArraySchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testTypeORMRestore = async (req: Request, res: Response): Promise<Response> => {
  const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, 'dynamic-restore');

  const repo = AppDataSource.getRepository('Role');

  const result = await repo.createQueryBuilder().restore().where('id IN (:...ids)', { ids: validatedIds }).execute();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: 'Restored successfully',
      controller: 'misc.RestoreRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMRestore;
