import DatabaseService from "@/lib/database/database-service/DatabaseService";
import iocContainer from "@/lib/di-ioc-container";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const inActivateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToInActivate: number[]): Promise<UpdateResult> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        const entityRepository = databaseService.getRepository(entity);

        // InActivate the entities with the validated IDs
        const result = await entityRepository.createQueryBuilder().update().set({ isActive: false }).where('id IN (:...ids)', { ids: idsToInActivate.map(String) }).execute();

        return result;

    } catch (error) {
        throw error;
    }
};

export default inActivateEntityRecords;
