import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import pageResponseBuilder from "@/utils/page-response.builder";
import { applyFilters, applySort } from "@/utils/query-utils";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

// Define the request body schema for validation
interface RelatedEntitiesPageRequestBody {
    owningEntityId: number,
    owningEntity: string,
    inverseField: string,
    pagination: { page: number, limit: number };
    sort: { [key: string]: 'ascend' | 'descend' }
    filters: FilterObject
}

// Joi schema for validating incoming requests
const relatedEntitiesPageQuerySchema: Joi.ObjectSchema<RelatedEntitiesPageRequestBody> = Joi.object({
    owningEntityId: Joi.number().integer().min(1).required(),
    owningEntity: Joi.string().disallow('').required(),
    inverseField: Joi.string().disallow('').required(),
    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1), // Default page: 1
        limit: Joi.number().integer().min(1).default(20), // Default limit: 20
    }).default({ page: 1, limit: 20 }), // Default pagination
    sort: Joi.object().pattern(
        Joi.string(), // Allow any key for sort fields
        Joi.string().valid('ascend', 'descend') // Valid sort orders
    ).default({ id: 'ascend' }), // Default sort by 'id' in ascending order
    filters: Joi.object().default({}) // Default: empty filter object
});

// Main function to fetch related entities
const relatedEntitiesPage = async (
    inverseEntity: EntityTarget<ObjectLiteral>,
    req: Request,
    res: Response
): Promise<Response> => {
    // Validate and extract request data
    const { owningEntityId, owningEntity, inverseField, filters, pagination, sort }: RelatedEntitiesPageRequestBody = await JoiSchemaValidator<RelatedEntitiesPageRequestBody>(
        relatedEntitiesPageQuerySchema,
        req.body,
        { abortEarly: false, allowUnknown: false },
        "dynamic-fetch-related-entities"
    );

    const inverseRepo = AppDataSource.getRepository(inverseEntity); // Get the repository for the inverse entity

    const inverseEntityAlias = inverseEntity.toString().toLowerCase(); // Determine alias for the inverse entity

    // Build query: join inverse entity with owning entity and filter by owning entity ID
    const qb = inverseRepo
        .createQueryBuilder(inverseEntityAlias)
        .innerJoin(`${inverseEntityAlias}.${inverseField}`, owningEntity, `${owningEntity}.id = ${owningEntityId}`) // Join the owning entity with alias
        .skip((pagination.page - 1) * pagination.limit) // Apply pagination (offset)
        .take(pagination.limit); // Limit results

    applySort(qb, sort); // Apply sorting based on request
    applyFilters(qb, inverseEntityAlias, filters); // Apply filters based on request

    // Execute the query and get paginated results
    const [results, total] = await qb.getManyAndCount();

    // Build response object with pagination data
    const page: PageResult = await pageResponseBuilder(results, pagination.page, pagination.limit, total, sort);

    // Return successful response
    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: page,
        controller: "CRUD.RelatedEntitiesPageController",
        message: "Related entities page fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default relatedEntitiesPage;