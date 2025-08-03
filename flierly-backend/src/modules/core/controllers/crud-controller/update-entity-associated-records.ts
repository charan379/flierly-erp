import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '../../services/crud-service';
import { plainToInstance } from 'class-transformer';
import UpdateEntityAssociatedRecordsRequestDTO from '../../dto/UpdateAssociatedEntityRecordsRequest.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Update associated records of an entity.
 * @param entity - The entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the update result.
 */
const updateAssociatedEntityRecords = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response> => {

  // convert to request object to DTO instance
  const requestBodyDTO = plainToInstance(UpdateEntityAssociatedRecordsRequestDTO, req.body, { enableImplicitConversion: true });

  // validate the request DTO
  await validateClassInstance(requestBodyDTO);

  const result = await crudService.updateAssociatedEntityRecords(entity, requestBodyDTO);

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: result[0],
      message: result[1],
      controller: 'CRUD.UpdateArrayFieldController',
      httpCode: HttpCodes.OK,
      req,
      res,
    }),
  );
};

export default updateAssociatedEntityRecords;
