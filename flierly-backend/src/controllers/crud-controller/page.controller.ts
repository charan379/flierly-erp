import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import pageResponseBuilder from '@/utils/builders/page-response.builder';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import PageRequestBody from '@/dto/requests/PageRequestBody.dto';
import { pascalToSnakeCase } from '@/utils/case-converters';
import applyWhereConditionsQB from '@/lib/typeorm/utils/qb-appy-where-conditions.util';
import { applySortOrderQB } from '@/lib/typeorm/utils';

/**
 * Fetch a paginated list of entities.
 * @param entity - The entity to paginate.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of entities.
 */
const page = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
    //  destructure the request body as PageRequestBody
    const { withDeleted, filters, limit, page, sort, loadRelations } = req.body as PageRequestBody;
    // get entity repository 
    const entityRepository = AppDataSource.getRepository(entity);
    // declare alias for entity to use in the query
    const entityAlias = pascalToSnakeCase(entity.toString());
    // create query builder 
    const queryBuilder = entityRepository.createQueryBuilder(entityAlias);
    // if withDeleted is true, then allow soft deleted records to be in the results
    if (withDeleted) {
        queryBuilder.withDeleted();
    }
    // apply realations to be loaded to the query builder
    if (loadRelations && loadRelations.length > 0) {
        loadRelations.forEach((relation) => {
            queryBuilder.innerJoinAndSelect(`${entityAlias}.${relation}`, `${relation}`)
        });
    };

    // apply filters to the query builder
    applyWhereConditionsQB(queryBuilder, 'andWhere', filters, entityAlias);

    // apply sort order to the query builder
    applySortOrderQB(queryBuilder, sort);

    // Get the paginated and filtered records
    const [results, total] = await queryBuilder.getManyAndCount();

    // build paginated results response
    const pageResponse: Page<object> = await pageResponseBuilder(results, page, limit, total, sort);

    return res.status(HttpCodes.OK).json(
        // build api response to be sent in JSON format
        apiResponseBuilder({
            success: true,
            result: pageResponse,
            controller: 'CRUD.PageController',
            message: 'Page fetched successfully',
            httpCode: HttpCodes.OK,
            error: null,
            req,
            res,
        }),
    );
};

export default page;
