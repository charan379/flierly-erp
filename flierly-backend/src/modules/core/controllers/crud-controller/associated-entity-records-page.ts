import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import AssociatedEntityRecordsPageRequestDTO from '../../dto/AssociatedEntityRecordsPageRequest.dto';
import { plainToInstance } from 'class-transformer';

/**
 * Fetch a paginated list of associated entity records.
 * @param associatedEntity - The inverse entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of associated entity records.
 */
const associatedEntityRecordsPage = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {

    const requestBodyDTO: AssociatedEntityRecordsPageRequestDTO = plainToInstance(AssociatedEntityRecordsPageRequestDTO, req.body, { enableImplicitConversion: true });

    const pageResponse = await crudService.getAssociatedEntityRecordsPage(entity, requestBodyDTO);

    // Return successful response
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result: pageResponse,
        controller: 'CRUDController.associatedEntityRecordsPage',
        message: 'Related entities page fetched successfully',
        httpCode: HttpCodes.OK,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default associatedEntityRecordsPage;
