import HttpCodes from '@/constants/http-codes.enum';
import FlierlyException from '@/lib/errors/flierly.exception';
import Joi, { AnySchema, ValidationOptions } from 'joi';

/**
 * Validates the given object against joi schema and returns validated object
 */
async function JoiSchemaValidator<T>(joiSchema: AnySchema, object: any, options: ValidationOptions, source: string): Promise<T> {
  const { value, error }: { value: T; error?: Joi.ValidationError } = joiSchema.validate(object, options);

  if (error) {
    throw new FlierlyException(
      error.message,
      HttpCodes.BAD_REQUEST,
      `Stack: ${error?.stack} || FunctionInput: joiSchema{${JSON.stringify(joiSchema)}}, object{${JSON.stringify(object)}},options{${JSON.stringify(options)}} , source{${source}}`,
    );
  }

  return value;
}

export default JoiSchemaValidator;
