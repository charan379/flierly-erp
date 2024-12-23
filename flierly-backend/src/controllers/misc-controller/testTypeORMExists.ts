import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';

const existsQuerySchema: Joi.ObjectSchema = Joi.object({
  filter: Joi.object().required(),
  withDeleted: Joi.bool().default(true),
});

const testTypeORMExists = async (req: Request, res: Response): Promise<Response> => {
  const { filter, withDeleted } = await JoiSchemaValidator<{ filter: object; withDeleted: boolean }>(
    existsQuerySchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'misc-controller-post-testTypeORMExists',
  );

  const repo = AppDataSource.getRepository('Role');

  // Create query builder for the entity
  const queryBuilder = repo.createQueryBuilder('role');

  // Apply filters to the query builder
  qbFilters(queryBuilder, 'role', filter);

  if (withDeleted) {
    queryBuilder.withDeleted();
  }

  // Apply pagination (skip and take for offset and limit)
  queryBuilder.take(1);

  // Get the paginated and filtered users
  const count = await queryBuilder.getCount();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: { exists: count > 0 },
      controller: 'misc.testTypeORMExists',
      message: 'testTypeORMExists fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMExists;
