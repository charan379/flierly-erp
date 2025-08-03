import HttpCodes from '@/constants/http-codes.enum';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import crudService from '../../services/crud-service';
import { plainToInstance } from 'class-transformer';
import ReadEntityRecordRequestDTO from '../../dto/ReadEntityRecordRequest.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Read an entity from the database.
 * @param entity - The entity to read.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the read entity.
 */
const read = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {
    // convert to request object to DTO instance
    const requestBodyDTO = plainToInstance(ReadEntityRecordRequestDTO, req.body, { enableImplicitConversion: true });

    // validated the request DTO
    await validateClassInstance(requestBodyDTO);

    const result = await crudService.readEntityRecord(entity, requestBodyDTO);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: 'Data fetched successfully',
        controller: 'CRUDController.read',
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

export default read;
