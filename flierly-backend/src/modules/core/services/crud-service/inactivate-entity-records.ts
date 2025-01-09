import { AppDataSource } from "@/lib/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const inActivateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToInActivate: Number[]): Promise<UpdateResult> => {
    try {

        const repo = AppDataSource.getRepository(entity);

        // InActivate the entities with the validated IDs
        const result = await repo.createQueryBuilder().update().set({ isActive: false }).where('id IN (:...ids)', { ids: idsToInActivate }).execute();

        return result;
    } catch (error) {
        throw error;
    }
};

export default inActivateEntityRecords;
