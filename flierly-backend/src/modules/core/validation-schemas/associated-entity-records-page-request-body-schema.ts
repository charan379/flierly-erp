import Joi from "joi";
import { AssociatedEntityRecordsPageRequestBody } from "../@types/request-data.types";

// Joi schema for validating incoming requests
const associatedEntityRecordsPageRequestBodySchema: Joi.ObjectSchema<AssociatedEntityRecordsPageRequestBody> = Joi.object({
    entityRecordId: Joi.number().integer().min(1).required(),
    entity: Joi.string().disallow('').required(),
    associatedSideField: Joi.string().disallow('').required(),
    withDeleted: Joi.boolean().optional().default(true),
    entitySideField: Joi.string().disallow('').required(),
    page: Joi.number().integer().min(1).default(1), // Default page: line
    limit: Joi.number().integer().min(1).default(20), // Default limit: 20
    sort: Joi.object()
        .pattern(
            Joi.string(), // Allow any key for sort fields
            Joi.string().valid('ascend', 'descend'), // Valid sort orders
        )
        .default({ id: 'ascend' }), // Default sort by 'id' in ascending order
    filters: Joi.object().default({}), // Default: empty filter object
    type: Joi.string().valid('allocated', 'unallocated').default('allocated'),
});

export default associatedEntityRecordsPageRequestBodySchema;