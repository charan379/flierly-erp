import Joi from "joi";


export const createBranchSchema: Joi.ObjectSchema<Branch> = Joi.object({
    name: Joi.string().min(5).example("Branch Name").required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(13).required(),
    alternatePhone: Joi.string().min(10).max(13).required(),
    addressId: Joi.number().integer().required(),
    taxIdentityId: Joi.number().integer().required(),
});