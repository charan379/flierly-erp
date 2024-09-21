import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import { pascalToSnakeCase } from "@/utils/caseConverters";
import handleFilter from "@/utils/handleFilter";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

const pageQuerySchema: Joi.ObjectSchema = Joi.object({
    filter: Joi.object().required(),
    page: Joi.number().default(1),
    limit: Joi.number().default(50),
    binMode: Joi.bool().default(false),
})

const testTypeORMPage = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { filter, limit, page, binMode } = await JoiSchemaValidator<{ filter: object, limit: number, page: number, binMode: boolean }>(pageQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-page");

    const repo = AppDataSource.getRepository(entity);

    // Create query builder for the entity
    const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

    // Apply filters to the query builder
    handleFilter(queryBuilder, pascalToSnakeCase(entity.toString()), filter);

    if (binMode) {
        queryBuilder.withDeleted();
        queryBuilder.andWhere('deletedAt IS NOT NULL');
    }

    // Apply pagination (skip and take for offset and limit)
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Get the paginated and filtered rows
    const [results, total] = await queryBuilder.getManyAndCount();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: {
            results,
            total,
            page,
            pageSize: limit,
            totalPages: Math.ceil(total / limit)
        },
        controller: "CRUD.PageController",
        message: "Page fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));

}

export default testTypeORMPage;