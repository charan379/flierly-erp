import Joi from "joi";
import { UpdateUserPasswordRequestBody } from "../@types/request-data.types";
import { idSchema, passwordSchema } from "@/lib/joi/joi-schemas/common.joi.schema";

const updateUserPasswordRequestBodySchema: Joi.ObjectSchema<UpdateUserPasswordRequestBody> = Joi.object({
    userId: idSchema.required(),
    password: passwordSchema.required(),
});

export default updateUserPasswordRequestBodySchema;