import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Transforms class-validator errors into a meaningful key-value pairs object.
 *
 * @param errors - An array of ValidationError objects from class-validator.
 * @returns A meaningful key-value pairs object.
 */
function buildValidationErrorsResult(errors: ValidationError[]): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    // Iterate through each ValidationError object
    errors.forEach(error => {
        const constraints = error.constraints; // Get validation constraints
        const property = error.property; // Get the property name

        // If there are constraints, join them into a single error message
        if (constraints) {
            result[property] = Object.values(constraints).join('. ');
        }

        // Recursively process nested validation errors
        if (error.children && error.children.length > 0) {
            const nestedErrors = buildValidationErrorsResult(error.children);
            Object.keys(nestedErrors).forEach(key => {
                result[`${property}.${key}`] = nestedErrors[key]; // Build nested key
            });
        }
    });

    return result;
};

export default buildValidationErrorsResult;
