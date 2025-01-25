import HttpCodes from "@/constants/http-codes.enum";
import FlierlyException from "@/lib/flierly.exception";
import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import buildValidationErrorsResult from "@/utils/builders/validation-errors-result.builder";
import { getMessage } from "@/utils/get-message.util";
import { validate } from "class-validator";
import { EntityTarget, ObjectLiteral } from "typeorm";

const updateEntityRecord = async (entity: EntityTarget<ObjectLiteral>, recordId: number, updateData: Record<string, any>): Promise<ObjectLiteral> => {
    try {
        if (updateData?.id) delete updateData.id; // Ensure the ID field is not part of the update

        const result = await AppDataSource.transaction(async (entityManager) => {
            const repo = entityManager.getRepository(entity);

            // Find the entity by ID to ensure it's loaded and managed
            const existingEntity = await repo.findOne({ where: { id: recordId } });

            if (!existingEntity)
                throw new FlierlyException(
                    getMessage("entityIdNotFound", { recordId, entity: repo.metadata.name }),
                    HttpCodes.BAD_REQUEST
                );

            const updateDataInstance = repo.create(updateData);

            const errors = await validate(updateDataInstance);

            if (errors.length > 0) {
                const errorMessages = buildValidationErrorsResult(errors);
                throw new FlierlyException(Object.keys(errorMessages).map((key) => `${key}: ${errorMessages[key]}`).join(", \n"), HttpCodes.BAD_REQUEST, JSON.stringify(errorMessages));
            };

            // Merge the update data with the existing entity
            const updatedEntity = repo.merge(existingEntity, updateDataInstance);
            // Save the updated entity (this triggers @BeforeUpdate hooks)
            await repo.save(updatedEntity);

            return updatedEntity; // Return the updated entity
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export default updateEntityRecord;
