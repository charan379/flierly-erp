import DatabaseService from "@/lib/database/database-service/DatabaseService";
import iocContainer from "@/lib/di-ioc-container";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const deleteEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToDelete: number[]): Promise<UpdateResult> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        const result = await databaseService.executeTransaction(async (entityManager) => {

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
