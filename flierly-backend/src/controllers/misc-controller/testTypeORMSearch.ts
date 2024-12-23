import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';

const searchQuerySchema: Joi.ObjectSchema = Joi.object({
  filter: Joi.object().required(),
  limit: Joi.number().default(50),
});

const testTypeORMSearch = async (req: Request, res: Response): Promise<Response> => {
  const { filter, limit } = await JoiSchemaValidator<{ filter: object; limit: number }>(
    searchQuerySchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'misc-controller-post-testTypeORMSearch',
  );

  const repo = AppDataSource.getRepository('Role');

  // Create query builder for the entity
  const queryBuilder = repo.createQueryBuilder('role');

  // Apply filters to the query builder
  qbFilters(queryBuilder, 'role', filter);

  // Apply pagination (skip and take for offset and limit)
  queryBuilder.take(limit);

  // Get the paginated and filtered users
  const results = await queryBuilder.getMany();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: results,
      controller: 'misc.testTypeORMSearch',
      message: 'testTypeORMSearch fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMSearch;
