import Joi from "joi";
import { Branch } from "@/models/interfaces/branch.interface";
import { emailSchema, nameMi5Ma50Schema, objectIdSchema, phoneSchema } from "./common.joi.schemas";

export const createBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: nameMi5Ma50Schema.required(),
    email: emailSchema.required(),
    phone: phoneSchema.required(),
    alternatePhone: phoneSchema,
    address: objectIdSchema.required(),
    taxIdentity: objectIdSchema.required(),
});