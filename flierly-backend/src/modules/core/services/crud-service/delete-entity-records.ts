import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const deleteEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToDelete: number[]): Promise<UpdateResult> => {
    try {

        const result = await AppDataSource.transaction(async (entityManager) => {

            const entityRepository = entityManager.getRepository(entity);

            // Soft delete the entities with the validated IDs
            const updateResult = await entityRepository
                .createQueryBuilder()
                .update()
                .set({
                    deletedAt: new Date(), // Set the deletion timestamp
                    isActive: false, // Set active to false
                })
                .where('id IN (:...ids)', { ids: idsToDelete }) // Specify which IDs to update
                .execute();

            return updateResult; // Return the result of the update operation
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export default deleteEntityRecords;
