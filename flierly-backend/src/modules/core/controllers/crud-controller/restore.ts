import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '../../services/crud-service';
import { plainToInstance } from 'class-transformer';
import RequestWithIdsArrayDTO from '../../dto/RequestWithIdsArray.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Restore soft-deleted entities in the database.
 * @param entity - The entity to restore.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the restore result.
 */
const restore = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

  try {

    // convert to request object to DTO instance
    const requestBodyDTO = plainToInstance(RequestWithIdsArrayDTO, req.body, { enableImplicitConversion: true });

    // validate the request DTO
    await validateClassInstance(requestBodyDTO);

    const result = await crudService.restoreEntityRecords(entity, requestBodyDTO.ids);

    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result,
        message: `${result.affected} ${typeof entity === "function" ? entity.name : entity}'s restored successfully.`,
        controller: 'CRUDController.restore',
        httpCode: HttpCodes.CREATED,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default restore;
