import Joi from 'joi';

// Define a mapping between TypeORM/PostgreSQL types, JavaScript types, and Joi validation rules
const typeORMToJoiMapping: Record<string, Joi.Schema> = {
    // PostgreSQL/TypeORM types
    'bigint': Joi.number().integer(),
    'smallint': Joi.number().integer(),
    'int': Joi.number().integer(),
    'integer': Joi.number().integer(),
    'varchar': Joi.string(),
    'text': Joi.string(),
    'timestamptz': Joi.date().iso(),
    'timestamp': Joi.date().iso(),
    'date': Joi.date(),
    'boolean': Joi.boolean(),
    'json': Joi.object(),
    'jsonb': Joi.object(),
    'float': Joi.number(),
    'real': Joi.number(),
    'double precision': Joi.number(),
    'numeric': Joi.number().precision(9),
    'decimal': Joi.number().precision(9),
    'uuid': Joi.string().uuid(),
    // JavaScript types
    'String': Joi.string(),
    'Number': Joi.number(),
    'Boolean': Joi.boolean(),
    'Array': Joi.array(),
    'Object': Joi.object(),
};

export default typeORMToJoiMapping;