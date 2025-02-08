import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const inActivateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToInActivate: number[]): Promise<UpdateResult> => {
    try {

        const entityRepository = AppDataSource.getRepository(entity);

        // InActivate the entities with the validated IDs
        const result = await entityRepository.createQueryBuilder().update().set({ isActive: false }).where('id IN (:...ids)', { ids: idsToInActivate.map(String) }).execute();

        return result;

    } catch (error) {
        throw error;
    }
};

export default inActivateEntityRecords;
