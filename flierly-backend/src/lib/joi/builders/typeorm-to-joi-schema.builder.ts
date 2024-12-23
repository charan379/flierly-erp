import Joi from 'joi';
import typeORMToJoiMapping from '../config/typeorm-to-joi.mapping';

// / Function to generate Joi schema from a TypeORM-like entity definition (with JS types)
const generateJoiSchemaFromTypeORM = (entityDefinition: Record<string, any>, enumMappings: Record<string, string[]> = {}): Joi.ObjectSchema => {
  const schema: Record<string, Joi.Schema> = {};

  Object.keys(entityDefinition).forEach((field) => {
    const fieldType = entityDefinition[field];
    // Handle JavaScript function types like `String`, `Number`, `Boolean`, etc.
    if (typeof fieldType === 'function') {
      const jsType = fieldType.name;
      schema[field] = typeORMToJoiMapping[jsType] || Joi.any();
    }
    // If we have a mapping for this field type, apply the corresponding Joi validation
    else if (typeORMToJoiMapping[fieldType]) {
      schema[field] = typeORMToJoiMapping[fieldType] as Joi.Schema;
    }
    // If no known mapping, default to Joi.any()
    else {
      schema[field] = Joi.any();
    }
  });

  return Joi.object(schema);
};

export default generateJoiSchemaFromTypeORM;
