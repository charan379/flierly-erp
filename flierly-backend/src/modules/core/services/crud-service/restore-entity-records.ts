import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const restoreEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToRestore: number[]): Promise<UpdateResult> => {
    try {

        const result = await AppDataSource.transaction(async (entityManager) => {

            const entityRepository = entityManager.getRepository(entity);

            // Soft delete the entities with the validated IDs
            const updateResult = await entityRepository
                .createQueryBuilder()
                .restore()
                .where('id IN (:...ids)', { ids: idsToRestore }) // Specify which IDs to update
                .execute();

            return updateResult; // Return the result of the update operation
        });

        return result;

    } catch (error) {

        throw error;
        
    }
};

export default restoreEntityRecords;
