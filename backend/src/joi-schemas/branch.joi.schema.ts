import Joi from "joi";
import { nameMi5Ma50Schema, altPhoneSchema, emailSchema, phoneSchema } from "./common-validator.schema";
import { Branch } from "@/models/interfaces/branch.interface";
import { objectIdSchema } from "./common.joi.schemas";

export const createBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: nameMi5Ma50Schema.required(),
    email: emailSchema.required(),
    phone: phoneSchema.required(),
    alternatePhone: altPhoneSchema.required(),
    address: objectIdSchema.required(),
    taxIdentity: objectIdSchema.required(),
});