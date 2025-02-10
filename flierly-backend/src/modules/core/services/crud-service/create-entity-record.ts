import HttpCodes from "@/constants/http-codes.enum";
import FlierlyException from "@/lib/errors/flierly.exception";
import { validate } from "class-validator";
import { EntityTarget, ObjectLiteral } from "typeorm";
import iocContainer from "@/lib/di-ioc-container";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";


const createEntityRecord = async (entity: EntityTarget<ObjectLiteral>, data: Record<string, any>): Promise<ObjectLiteral> => {
    try {
        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        // Get repository for the entity type
        const entityRepository = databaseService.getRepository(entity);

        // Create entity instance with validated data

        const newRecord = entityRepository.create(data);

        // Perform class-validator validation
        const errors = await validate(newRecord);

        if (errors.length > 0) {
            throw new FlierlyException(
                errors.map(e => e.constraints ? Object.values(e.constraints) : "").join(", "),
                HttpCodes.BAD_REQUEST);
        }

        // Save the validated entity to database
        const savedRecord = await entityRepository.save(newRecord);

        return savedRecord;

    } catch (error) {

        throw error;
    }
};

export default createEntityRecord;