import HttpCodes from "@/constants/http-codes.enum";
import FlierlyException from "@/lib/flierly.exception";
import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { validate } from "class-validator";
import { EntityTarget, ObjectLiteral } from "typeorm";


const createEntityRecord = async (entity: EntityTarget<ObjectLiteral>, data: Record<string, any>): Promise<ObjectLiteral> => {
    try {
        // Get repository for the entity type
        const repo = AppDataSource.getRepository(entity);

        // Create entity instance with validated data
        const newRow = repo.create(data);

        // Perform class-validator validation
        const errors = await validate(newRow);
        if (errors.length > 0) {
            throw new FlierlyException(
                errors.map(e => e.constraints ? Object.values(e.constraints) : "").join(", "),
                HttpCodes.BAD_REQUEST);
        }

        // Save the validated entity to database
        const savedRow = await repo.save(newRow);

        return savedRow;
    } catch (error) {
        throw error;
    }
};

export default createEntityRecord;