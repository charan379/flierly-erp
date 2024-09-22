import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import { pascalToSnakeCase } from "@/utils/case-converters";
import handleFilter from "@/utils/handle-filter";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

const existsQuerySchema: Joi.ObjectSchema = Joi.object({
    filter: Joi.object().required(),
    withDeleted: Joi.bool().default(true),
})

const exists = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { filter, withDeleted } = await JoiSchemaValidator<{ filter: object, withDeleted: boolean }>(existsQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-exists");

    const repo = AppDataSource.getRepository(entity);

    // Create query builder for the entity
    const queryBuilder = repo.createQueryBuilder(pascalToSnakeCase(entity.toString()));

    // Apply filters to the query builder
    handleFilter(queryBuilder, pascalToSnakeCase(entity.toString()), filter);

    if (withDeleted) {
        queryBuilder.withDeleted();
    }

    queryBuilder.take(1);

    const count = await queryBuilder.getCount();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: { exists: count > 0 },
        controller: "CRUD.ExistsController",
        message: "exists fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));

}

export default exists;