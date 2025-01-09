import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { qbFilters } from '@/lib/typeorm/utils';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { pascalToSnakeCase } from '@/utils/case-converters';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { SearchEntityRecordsRequestBody } from '../../@types/request-data.types';
import searchEntityRecordsRequestBodySchema from '../../validation-schemas/search-entity-records-request-body';
import crudService from '../../services/crud-service';

/**
 * Search for entities in the database.
 * @param entity - The entity to search.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The search results.
 */
const search = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {

    const reqBody = await JoiSchemaValidator<SearchEntityRecordsRequestBody>(
      searchEntityRecordsRequestBodySchema,
      req.body,
      { abortEarly: false },
      'CRUDController.search',
    );

    const results = await crudService.searchEntityRecords(entity, reqBody);

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
  } catch (error) {
    return next(error);
  }
};

export default search;
