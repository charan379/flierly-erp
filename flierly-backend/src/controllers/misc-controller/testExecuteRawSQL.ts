import HttpCodes from '@/constants/http-codes.enum';
import { Privilege } from '@/entities/iam/Privilege.entity';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import executeQueryFromFile from '@/lib/typeorm/query-executors';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testExecuteRawSQL = async (req: Request, res: Response): Promise<Response> => {
  const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, 'misc-controller-get-testExecuteRawSQL');

  console.time('testExecuteRawSQL');
  const result: Privilege[] = await executeQueryFromFile<Privilege[]>('./iam/raw-sql/userPrivileges.sql', [id]);
  console.timeEnd('testExecuteRawSQL');
  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: 'Data fetched successfully',
      controller: 'misc.CreateRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default testExecuteRawSQL;
