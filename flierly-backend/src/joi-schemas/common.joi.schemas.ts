import Joi from "joi";
import mongoose from "mongoose";

export const objectIdSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        'string.pattern.base': "Please provied a valid Id : {#value} is not a valid id."
    });

export const idSchema = Joi.number()
    .required()
    .messages({
        'number.base': "Please provide a valid id: {#value} is not a valid number.",
        'any.required': "A id is required."
    });

export const idArraySchema = Joi.array()
    .items(Joi.number().required())
    .required()
    .messages({
        'array.base': "Please provide a valid array of ids.",
        'array.empty': "The array should not be empty.",
        'any.required': "An array of ids is required.",
        'number.base': "Each id must be a valid number.",
    });

export const objectIdArraySchema: Joi.Schema<mongoose.ObjectId[]> = Joi.array().items(
    Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': "Please provide a valid Id: {#value} is not a valid id."
        })
);

export const updateManyActions: Joi.Schema<string> = Joi.string()
    .valid('activate', 'inactivate').example('activate')
    .messages({
        'any.only': 'Value must be one of [delete, activate, inactivate].',
    });


export const updateManyBodySchema: Joi.Schema<{ ids: mongoose.ObjectId[], action: 'delete' | 'activate' | 'inactivate' }> = Joi.object({
    ids: Joi.array().items(
        Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                'string.pattern.base': "Please provide a valid Id: {#value} is not a valid id."
            })
    ),
    action: Joi.string()
        .valid('activate', 'inactivate')
        .example('activate')
        .messages({
            'any.only': 'Value must be one of [activate, inactivate].',
        }).required()
});


export const nameMi5Ma50Schema: Joi.Schema<string> = Joi.string().min(5).max(50).example("Name")
    .messages({
        'string.min': 'Name must be at least 5 characters long.',
        'string.max': 'Name must not exceed 50 characters.',
    });

export const emailSchema: Joi.Schema<string> = Joi.string().email().example("someone@gmail.com")
    .messages({
        'string.email': 'Invalid email address'
    })

export const phoneSchema: Joi.Schema<string> = Joi.string().min(10).max(13).example("9876543210")
    .messages({
        'string.min': 'Phone must be at least 10 characters long.',
        'string.max': 'Phone must not exceed 13 characters.',
    });

export const passwordSchema: Joi.StringSchema = Joi.string()
    .min(8)
    .max(26)
    .regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})$/)
    .messages({
        "string.min": "Password must have at least 8 characters.",
        "string.max": "Password cannot contain more than 26 characters.",
        "object.regex": "Invalid password, Choose a password with 8-26 characters lenght, atleast one number, one smallcase and one uppercase characters."
    })
    .example("!5tr0ng@pa55w0rd");