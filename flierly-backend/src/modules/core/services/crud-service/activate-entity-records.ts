import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const activateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToActivate: number[]): Promise<UpdateResult> => {
    try {

        const entityRepository = AppDataSource.getRepository(entity);

        // Activate the entities with the validated IDs
        const result = await entityRepository.createQueryBuilder().update().set({ isActive: true }).where('id IN (:...ids)', { ids: idsToActivate }).execute();

        return result;

    } catch (error) {

        throw error;

    }
};

export default activateEntityRecords;
