import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const activateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToActivate: Number[]): Promise<UpdateResult> => {
    try {

        const repo = AppDataSource.getRepository(entity);

        // Activate the entities with the validated IDs
        const result = await repo.createQueryBuilder().update().set({ isActive: true }).where('id IN (:...ids)', { ids: idsToActivate }).execute();

        return result;
        
    } catch (error) {

        throw error;

    }
};

export default activateEntityRecords;
