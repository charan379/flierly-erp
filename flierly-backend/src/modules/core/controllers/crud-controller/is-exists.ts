import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '../../services/crud-service';
import IsEntityRecordExistsRequestDTO from '../../dto/IsEntityRecordExistsRequest.dto';
import { plainToInstance } from 'class-transformer';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Check if an entity exists in the database.
 * @param entity - The entity to check.
 * @param req - The request object.
 * @param res - The response object.
 * @returns Whether the entity exists.
 */
const isExists = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {
    // convert to request object to DTO instance
    const requestBodyDTO: IsEntityRecordExistsRequestDTO = plainToInstance(IsEntityRecordExistsRequestDTO, req.body, { enableImplicitConversion: true });

    // validate the request DTO
    await validateClassInstance(requestBodyDTO);
    // check if the entity exists
    const result = await crudService.isEntityExists(entity, requestBodyDTO);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        controller: 'CRUD.ExistsController',
        message: 'Exists fetched successfully',
        httpCode: HttpCodes.OK,
        error: null,
        req,
        res,
      }),
    );
  } catch (error) {

    next(error);

  }
};

export default isExists;
