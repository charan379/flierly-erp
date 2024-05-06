
import { emailSchema, nameMi5Ma50Schema, phoneSchema } from "@/joi-schemas/common.joi.schemas";
import { Branch } from "@/models/interfaces/branch.interface";
import Joi from "joi";



export const createBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: nameMi5Ma50Schema.required(),
    email: emailSchema.required(),
    phone: phoneSchema.required(),
    alternatePhone: phoneSchema.required(),
    addressId: Joi.number().integer().required(),
    taxIdentityId: Joi.number().integer().required(),
});

export const updateBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: nameMi5Ma50Schema,
    email: emailSchema,
    phone: phoneSchema,
    alternatePhone: phoneSchema,
    isActive: Joi.boolean(),
})