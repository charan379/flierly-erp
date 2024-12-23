import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { pascalToSnakeCase } from '@/utils/case-converters';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const isExistsQuerySchema: Joi.ObjectSchema = Joi.object({
  filters: Joi.object().required(),
  withDeleted: Joi.bool().default(true),
});

/**
 * Check if an entity exists in the database.
 * @param entity - The entity to check.
 * @param req - The request object.
 * @param res - The response object.
 * @returns Whether the entity exists.
 */
const isExists = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  const { filters, withDeleted } = await JoiSchemaValidator<{ filters: object; withDeleted: boolean }>(
    isExistsQuerySchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'dynamic-exists',
  );

  const repo = AppDataSource.getRepository(entity);

  // Create query builder for the entity
  const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

  // Apply filters to the query builder
  qbFilters(queryBuilder, pascalToSnakeCase(entity.toString()), filters);

  if (withDeleted) {
    queryBuilder.withDeleted();
  }

  queryBuilder.take(1);

  const count = await queryBuilder.getCount();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: { exists: count > 0 },
      controller: 'CRUD.ExistsController',
      message: 'exists fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default isExists;
