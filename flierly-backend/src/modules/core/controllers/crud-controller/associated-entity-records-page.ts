import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import { AssociatedEntityRecordsPageRequestBody } from '../../@types/request-data.types';
import associatedEntityRecordsPageRequestBodySchema from '../../validation-schemas/associated-entity-records-page-request-body-schema';

/**
 * Fetch a paginated list of associated entity records.
 * @param associatedEntity - The inverse entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of associated entity records.
 */
const associatedEntityRecordsPage = async (associatedEntity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {

    const reqBody: AssociatedEntityRecordsPageRequestBody = await JoiSchemaValidator(associatedEntityRecordsPageRequestBodySchema, req.body, { abortEarly: false }, "CRUDController.associatedEntityRecordsPage");
    const pageResponse = await crudService.getAssociatedEntityRecordsPage(associatedEntity, reqBody);

    // Return successful response
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        result: pageResponse,
        controller: 'CRUDController.associatedEntityRecordsPage',
        message: 'Related entities page fetched successfully',
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

export default associatedEntityRecordsPage;
