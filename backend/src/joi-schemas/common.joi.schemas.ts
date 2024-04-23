import Joi from "joi";

export const objectIdSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        'string.pattern.base': "Please provied a valid Id : {#value} is not a valid id"
    });