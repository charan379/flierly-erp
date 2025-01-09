import Joi from "joi";
import { SearchEntityRecordsRequestBody } from "../@types/request-data.types";


const searchEntityRecordsRequestBodySchema: Joi.ObjectSchema<SearchEntityRecordsRequestBody> = Joi.object({
    limit: Joi.number().integer().min(1).default(20), // Default limit: 20
    filters: Joi.object().default({}), // Default: empty filter object
});

export default searchEntityRecordsRequestBodySchema;