import Joi from "joi";
import { EntityRecordsPageRequestBody } from "../@types/request-data.types";

// Joi schema for validating incoming requests
const entityRecordsPageRequestBodySchema: Joi.ObjectSchema<EntityRecordsPageRequestBody> = Joi.object({
    loadRelations: Joi.array().items(Joi.string().disallow('').disallow(null)).unique(),
    withDeleted: Joi.boolean().optional().default(true),
    page: Joi.number().integer().optional().min(1).default(1), // Default page: line
    limit: Joi.number().integer().min(1).optional().default(20), // Default limit: 20
    sort: Joi.object()
        .optional()
        .pattern(
            Joi.string(), // Allow any key for sort fields
            Joi.string().valid('ascend', 'descend'), // Valid sort orders
        )
        .default({ id: 'ascend' }), // Default sort by 'id' in ascending order
    filters: Joi.object().optional().default({}), // Default: empty filter object
});

export default entityRecordsPageRequestBodySchema;