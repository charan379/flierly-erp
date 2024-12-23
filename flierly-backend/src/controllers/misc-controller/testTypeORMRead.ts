import HttpCodes from '@/constants/http-codes.enum';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const testTypeORMRead = async (req: Request, res: Response): Promise<Response> => {
  const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, 'misc-controller-get-testTypeORMCreate');

  const repo = AppDataSource.getRepository('Role');

  const data = await repo.findOneBy({ id });

  if (data === null) throw new FlierlyException(`No documents found with given id: ${id}`, HttpCodes.BAD_REQUEST, '', '');

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: data,
      message: 'Data fetched successfully',
      controller: 'misc.CreateRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMRead;
