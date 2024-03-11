import Joi from "joi";

export const NameMi5Ma50Schema: Joi.Schema<string> = Joi.string().min(5).max(50).example("Name")
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

export const altPhoneSchema: Joi.Schema<string> = Joi.string().min(10).max(13).example("9876543210")
    .messages({
        'string.min': 'Alternate phone must be at least 10 characters long.',
        'string.max': 'Alternate phone must not exceed 13 characters.',
    });

export const pageRequestSchema: Joi.Schema<PageRequest> = Joi.object({
    page: Joi.number().integer().min(1).required(),
    size: Joi.number().integer().min(1).required(),
})