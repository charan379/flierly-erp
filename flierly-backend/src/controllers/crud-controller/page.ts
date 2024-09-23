import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import { pascalToSnakeCase } from "@/utils/case-converters";
import handleFilter from "@/utils/handle-filter";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import pageResponseBuilder from "@/utils/page-response.builder";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";


interface PageRequestBody {
    autopopulateIds: boolean;
    binMode: boolean;
    pagination: { page: number, limit: number };
    sort: { [key: string]: 'ascend' | 'descend' }
    filters: FilterObject
}

const pageQuerySchema: Joi.ObjectSchema = Joi.object({
    autopopulateIds: Joi.boolean().default(false), // Default: false
    binMode: Joi.boolean().default(false), // Default: false
    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1), // Default: 1
        limit: Joi.number().integer().min(1).default(20), // Default: 20
    }).default({ page: 1, limit: 20 }), // Default pagination object
    sort: Joi.object().pattern(
        Joi.string(), // Any key allowed
        Joi.string().valid('ascend', 'descend') // Values: 'ascend' or 'descend'
    ).default({ createdAt: 'ascend' }), // Default sort by 'createdAt' ascending
    filters: Joi.object().default({}) // Default: empty filter object
})

const page = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { filters, pagination, autopopulateIds, binMode, sort }: PageRequestBody = await JoiSchemaValidator<PageRequestBody>(pageQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-page");

    const repo = AppDataSource.getRepository(entity);

    // Create query builder for the entity
    const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

    // Apply filters to the query builder
    handleFilter(queryBuilder, pascalToSnakeCase(entity.toString()), filters);

    if (binMode) {
        queryBuilder.withDeleted();
        queryBuilder.andWhere('deletedAt IS NOT NULL');
    }

    if (autopopulateIds) {
        queryBuilder.loadAllRelationIds();
    }

    // Apply pagination (skip and take for offset and limit)
    queryBuilder.skip((pagination.page - 1) * pagination.limit).take(pagination.limit);

    // Get the paginated and filtered rows
    const [results, total] = await queryBuilder.getManyAndCount();

    const page: PageResult = await pageResponseBuilder(results, pagination.page, pagination.limit, total, sort);

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: page,
        controller: "CRUD.PageController",
        message: "Page fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));

}

export default page;