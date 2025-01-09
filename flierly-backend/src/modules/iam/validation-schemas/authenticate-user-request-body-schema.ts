import Joi from "joi";
import { AuthenticateUserRequestBody } from "../@types/request-data.types";
import { nameMi5Ma50Schema, passwordSchema } from "@/lib/joi/joi-schemas/common.joi.schema";


const authenticateUserRequestBodySchema: Joi.ObjectSchema<AuthenticateUserRequestBody> = Joi.object({
    username: nameMi5Ma50Schema.required(),
    password: passwordSchema.required(),
    remember: Joi.boolean().default(false),
});

export default authenticateUserRequestBodySchema;