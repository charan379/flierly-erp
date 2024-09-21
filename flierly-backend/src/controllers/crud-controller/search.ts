import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import { pascalToSnakeCase } from "@/utils/caseConverters";
import handleFilter from "@/utils/handleFilter";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

const searchQuerySchema: Joi.ObjectSchema = Joi.object({
    filter: Joi.object().required(),
    limit: Joi.number().default(50),
})

const search = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { filter, limit } = await JoiSchemaValidator<{ filter: object, limit: number }>(searchQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-search");

    const repo = AppDataSource.getRepository(entity);

    // Create query builder for the entity
    const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

    // Apply filters to the query builder
    handleFilter(queryBuilder, pascalToSnakeCase(entity.toString()), filter);

    // Apply (take for offset and limit)
    queryBuilder.take(limit);

    // Get the paginated and filtered users
    const results = await queryBuilder.getMany();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: results,
        controller: "CRUD.SearchController",
        message: "Search fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));

}

export default search;