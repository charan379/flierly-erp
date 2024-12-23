import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { pascalToSnakeCase } from '@/utils/case-converters';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';

const searchQuerySchema: Joi.ObjectSchema = Joi.object({
  filters: Joi.object().required(),
  limit: Joi.number().default(50),
});

/**
 * Search for entities in the database.
 * @param entity - The entity to search.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The search results.
 */
const search = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  const { filters, limit } = await JoiSchemaValidator<{ filters: object; limit: number }>(
    searchQuerySchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'dynamic-search',
  );

  const repo = AppDataSource.getRepository(entity);

  // Create query builder for the entity
  const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

  // Apply filters to the query builder
  qbFilters(queryBuilder, pascalToSnakeCase(entity.toString()), filters);

  // Apply (take for offset and limit)
  queryBuilder.take(limit);

  // Get the paginated and filtered users
  const results = await queryBuilder.getMany();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: results,
      controller: 'CRUD.SearchController',
      message: 'Search fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default search;
