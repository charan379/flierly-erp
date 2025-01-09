import Joi from "joi";
import { IsEntityRecordExistsRequestBody } from "../@types/request-data.types";

const isEntityRecordExistsRequestBodySchema: Joi.ObjectSchema<IsEntityRecordExistsRequestBody> = Joi.object({
    filters: Joi.object().required(),
    withDeleted: Joi.bool().default(true),
});

export default isEntityRecordExistsRequestBodySchema;