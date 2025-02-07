import HttpCodes from "@/constants/http-codes.enum";
import FlierlyException from "@/lib/errors/flierly.exception";
import buildValidationErrorsResult from "@/utils/builders/validation-errors-result.builder";
import { validate } from "class-validator";

const validateClassInstance = async (classInstance: any): Promise<void> => {
    const errors = await validate(classInstance);
    if (errors.length > 0) {
        const errorMessages = buildValidationErrorsResult(errors);

        const joinedMessagesTogether = Object.keys(errorMessages)
            .map(key => `${key}: ${errorMessages[key]}`)
            .join('.\n');

        throw new FlierlyException(joinedMessagesTogether, HttpCodes.BAD_REQUEST, JSON.stringify(errorMessages));
    }
};

export default validateClassInstance;