import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import { EntityRecordsPageRequestBody } from '../../@types/request-data.types';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import entityRecordsPageRequestBodySchema from '../../validation-schemas/entity-records-page-request-body-schema';

/**
 * Fetch a paginated list of entities.
 * @param entity - The entity to paginate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of entities.
 */
const page = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {

        const reqBody: EntityRecordsPageRequestBody = await JoiSchemaValidator<EntityRecordsPageRequestBody>(entityRecordsPageRequestBodySchema, req.body, { abortEarly: false }, "CurdController.page")

        const pageResponse = await crudService.entityRecordsPage(entity, reqBody);
        
        return res.status(HttpCodes.OK).json(
            // build api response to be sent in JSON format
            apiResponseBuilder({
                success: true,
                result: pageResponse,
                controller: 'CRUDController.page',
                message: 'Page fetched successfully',
                httpCode: HttpCodes.OK,
                error: null,
                req,
                res,
            }),
        );
    } catch (error) {
        return next(error)
    }
};

export default page;
