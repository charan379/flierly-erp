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
    parentId: number,
    parentEntity: string,
    relationField: string,
    pagination: { page: number, limit: number };
    sort: { [key: string]: 'ascend' | 'descend' }
    filters: FilterObject
}

// Joi schema for validating incoming requests
const relatedEntitiesPageQuerySchema: Joi.ObjectSchema<RelatedEntitiesPageRequestBody> = Joi.object({
    parentId: Joi.number().integer().min(1).required(),
    parentEntity: Joi.string().disallow('').required(),
    relationField: Joi.string().disallow('').required(),
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
    entity: EntityTarget<ObjectLiteral>,
    req: Request,
    res: Response
): Promise<Response> => {
    // Validate and extract request data
    const { parentId, parentEntity, relationField, filters, pagination, sort }: RelatedEntitiesPageRequestBody = await JoiSchemaValidator<RelatedEntitiesPageRequestBody>(
        relatedEntitiesPageQuerySchema,
        req.body,
        { abortEarly: false, allowUnknown: false },
        "dynamic-fetch-related-entities"
    );

    const repo = AppDataSource.getRepository(entity); // Get the repository for the target entity

    const relatedEntity = entity.toString().toLowerCase(); // Determine alias for the related entity

    // Build query: join related entity with parent and filter by parent ID
    const qb = repo
        .createQueryBuilder(relatedEntity)
        .innerJoin(`${relatedEntity}.${relationField}`, parentEntity, `${parentEntity}.id = ${parentId}`) // Join the parent entity with alias
        .skip((pagination.page - 1) * pagination.limit) // Apply pagination (offset)
        .take(pagination.limit); // Limit results

    applySort(qb, sort); // Apply sorting based on request
    applyFilters(qb, relatedEntity, filters); // Apply filters based on request

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
