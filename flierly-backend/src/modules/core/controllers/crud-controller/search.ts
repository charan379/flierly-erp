import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '../../services/crud-service';
import { plainToInstance } from 'class-transformer';
import SearchEntityRecordsRequestDTO from '../../dto/SearchEntityRecordsRequest.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Search for entities in the database.
 * @param entity - The entity to search.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The search results.
 */
const search = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // convert to request object to DTO instance
    const requestBodyDTO = plainToInstance(SearchEntityRecordsRequestDTO, req.body, { enableImplicitConversion: true });
    // validate the request DTO
    await validateClassInstance(requestBodyDTO);

    const results = await crudService.searchEntityRecords(entity, requestBodyDTO);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result: results,
        controller: 'CRUD.SearchController',
        message: 'Search fetched successfully',
        httpCode: HttpCodes.OK,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default search;
