import HttpCodes from "@/constants/http-codes.enum";
import FlierlyException from "@/lib/flierly.exception";
import { validate } from "class-validator";

const validateEntity = async (entity: any): Promise<void> => {
    const errors = await validate(entity);
    if (errors.length > 0) {
        const errorMessages = errors
            .map((e) => (e.constraints ? Object.values(e.constraints).join(", ") : ""))
            .join(", ");
        throw new FlierlyException(errorMessages, HttpCodes.BAD_REQUEST);
    }
};

export default validateEntity;