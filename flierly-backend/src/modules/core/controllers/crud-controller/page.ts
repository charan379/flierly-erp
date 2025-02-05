import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import crudService from '@/modules/core/services/crud-service';
import PageRequestDTO from '../../dto/PageRequest.dto';
import { plainToInstance } from 'class-transformer';
import validateEntityInstance from '@/lib/class-validator/utils/validate-entity.util';

/**
 * Fetch a paginated list of entities.
 * @param entity - The entity to paginate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of entities.
 */
const page = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    try {

        const pageRequestDTO: PageRequestDTO = plainToInstance(PageRequestDTO, req.body, { enableImplicitConversion: true });
        
        await validateEntityInstance(pageRequestDTO);

        const pageResponse = await crudService.entityRecordsPage(entity, pageRequestDTO);
        
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
