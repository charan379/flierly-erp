import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import { plainToInstance } from 'class-transformer';
import RequestWithIdParamDTO from '../../dto/RequestWithIdParam.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Update an entity in the database.
 * @param entity - The entity to update.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The updated entity.
 */
const update = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // convert to request object to DTO instance
    const requestParamsDTO = plainToInstance(RequestWithIdParamDTO, req.params, { enableImplicitConversion: true });
    // validate the request DTO
    await validateClassInstance(requestParamsDTO);

    const result = await crudService.updateEntityRecord(entity, requestParamsDTO.id, req.body);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${typeof entity === "function" ? entity.name : entity} updated successfully with ID: ${requestParamsDTO.id}`,
        controller: 'CRUD.UpdateController',
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

export default update;
