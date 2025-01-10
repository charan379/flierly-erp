import Joi from "joi";
import { EntityReadRequestBody } from "../@types/request-data.types";
import { idSchema } from "@/lib/joi/joi-schemas/common.joi.schema";

const entityReadRequestBodySchema: Joi.ObjectSchema<EntityReadRequestBody> = Joi.object({
    loadRelations: Joi.array().items(Joi.string().disallow('').disallow(null)).unique(),
    id: idSchema.required(),
});

export default entityReadRequestBodySchema;