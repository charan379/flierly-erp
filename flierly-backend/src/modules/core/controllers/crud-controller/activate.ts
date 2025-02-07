import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import { plainToInstance } from 'class-transformer';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';
import RequestWithIdsArrayDTO from '../../dto/RequestWithIdsArray.dto';

/**
 * Activate entities in the database.
 * @param entity - The entity to activate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the activate result.
 */
const activate = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // convert to request object to DTO instance
    const requestBodyDTO = plainToInstance(RequestWithIdsArrayDTO, req.body, { enableImplicitConversion: true });

    // validate the request DTO
    await validateClassInstance(requestBodyDTO);

    const result = await crudService.activateEntityRecords(entity, requestBodyDTO.ids);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${result.affected} ${typeof entity === "function" ? entity.name : entity}'s activated successfully.`,
        controller: 'CRUDController.activate',
        httpCode: HttpCodes.OK,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error)
  }
};

export default activate;
