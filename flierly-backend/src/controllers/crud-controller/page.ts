import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import pageResponseBuilder from "@/utils/page-response.builder";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, FindManyOptions, IsNull, Not, ObjectLiteral } from "typeorm";
import applyFindSort from "@/utils/query-utils/applyFindSort";
import applyConditionForFind from "@/utils/query-utils/applyConditionForFind";


interface PageRequestBody {
    loadRelations: string[];
    binMode: boolean;
    pagination: { page: number, limit: number };
    sort: { [key: string]: 'ascend' | 'descend' }
    filters: FilterObject
}

const pageQuerySchema: Joi.ObjectSchema<PageRequestBody> = Joi.object({
    loadRelations: Joi.array().items(Joi.string().disallow('').disallow(null)).unique(),
    binMode: Joi.boolean().default(false), // Default: false
    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1), // Default: 1
        limit: Joi.number().integer().min(1).default(20), // Default: 20
    }).default({ page: 1, limit: 20 }), // Default pagination object
    sort: Joi.object().pattern(
        Joi.string(), // Any key allowed
        Joi.string().valid('ascend', 'descend') // Values: 'ascend' or 'descend'
    ).default({ id: 'ascend' }), // Default sort by 'id' ascending
    filters: Joi.object().default({}) // Default: empty filter object
})

const page = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { filters, pagination, loadRelations, binMode, sort }: PageRequestBody = await JoiSchemaValidator<PageRequestBody>(pageQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-page");

    const repo = AppDataSource.getRepository(entity);

    // Initialize FindManyOptions
    const findOptions: FindManyOptions<ObjectLiteral> = {
        relations: loadRelations?.length > 0 ? [...loadRelations] : [], // Load relations if required
        where: {}, // Initialize where clause
        order: applyFindSort(sort), // Initialize order clause
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        withDeleted: binMode
    };

    if (binMode) {
        findOptions.where = { ...findOptions.where, deletedAt: Not(IsNull()) }
    }

    // Apply filters to where clause
    Object.keys(filters).forEach((field) => {
        findOptions.where = { ...findOptions.where, ...applyConditionForFind(findOptions.where, field, filters[field]) };
    });

    // Get the paginated and filtered rows
    const [results, total] = await repo.findAndCount(findOptions);

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