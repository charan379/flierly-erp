import HttpCodes from '@/constants/http-codes.enum';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';

const testTypeORMUpdate = async (req: Request, res: Response): Promise<Response> => {
  const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, 'misc-controller-get-testTypeORMUpdate');

  const update = await JoiSchemaValidator<object>(Joi.object().required(), req.body, { abortEarly: false, allowUnknown: false }, 'misc-controller-get-testTypeORMUpdate');

  const result = await AppDataSource.transaction(async (entityManager) => {
    const repo = entityManager.getRepository('Role');

    const updateResult = await repo
      .createQueryBuilder()
      .update()
      .set({ ...update })
      .where('id = :id', { id: id }) // Specify which IDs to update
      .execute();

    return updateResult; // Return the result of the update operation
  });

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: 'Updated successfully',
      controller: 'misc.UpdateRoleController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMUpdate;
