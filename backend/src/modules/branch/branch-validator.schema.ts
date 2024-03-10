import { NameMi5Ma50Schema, altPhoneSchema, emailSchema, phoneSchema } from "@/lib/common-validator.schema";
import Joi from "joi";



export const createBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: NameMi5Ma50Schema.required(),
    email: emailSchema.required(),
    phone: phoneSchema.required(),
    alternatePhone: altPhoneSchema.required(),
    addressId: Joi.number().integer().required(),
    taxIdentityId: Joi.number().integer().required(),
});

export const updateBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: NameMi5Ma50Schema,
    email: emailSchema,
    phone: phoneSchema,
    alternatePhone: altPhoneSchema,
    isActive: Joi.boolean(),
})