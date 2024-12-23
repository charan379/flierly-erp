import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';

const pageQuerySchema: Joi.ObjectSchema = Joi.object({
  filter: Joi.object().required(),
  page: Joi.number().default(1),
  limit: Joi.number().default(50),
});

const testTypeORMPage = async (req: Request, res: Response): Promise<Response> => {
  const { filter, limit, page } = await JoiSchemaValidator<{ filter: object; limit: number; page: number }>(
    pageQuerySchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'misc-controller-post-testTypeORMPage',
  );

  const repo = AppDataSource.getRepository('Role');

  // Create query builder for the entity
  const queryBuilder = repo.createQueryBuilder('role');

  // Apply filters to the query builder
  qbFilters(queryBuilder, 'role', filter);

  // queryBuilder.withDeleted();

  // Apply pagination (skip and take for offset and limit)
  queryBuilder.skip((page - 1) * limit).take(limit);

  // Get the paginated and filtered users
  const [results, total] = await queryBuilder.getManyAndCount();

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: {
        results,
        total,
        page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
      controller: 'misc.testTypeORMPage',
      message: 'testTypeORMPage fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default testTypeORMPage;
