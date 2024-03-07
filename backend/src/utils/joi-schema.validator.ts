import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "@/lib/flierly.exception";
import Joi, { AnySchema, ValidationOptions } from "joi";


/**
 * Validates the given object against joi schema and returns validated object
 */
async function JoiSchemaValidator<T>(joiSchema: AnySchema, object: any, options: ValidationOptions, source: string): Promise<T> {

    const { value, error }: { value: T, error?: Joi.ValidationError } = joiSchema.validate(object, options);

    if (error) {
        throw new FlierlyException(
            "Schema validation failed",
            HttpCodes.BAD_REQUEST,
            error.message,
            `Stack: ${error?.stack} || FunctionInput: joiSchema{${JSON.stringify(joiSchema)}}, object{${JSON.stringify(object)}},options{${JSON.stringify(options)}} , source{${source}}`,
        )
    }

    return value;
};

export default JoiSchemaValidator;