import DatabaseService from "@/lib/database/database-service/DatabaseService";
import iocContainer from "@/lib/di-ioc-container";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import { EntityTarget, ObjectLiteral, UpdateResult } from "typeorm";


const activateEntityRecords = async (entity: EntityTarget<ObjectLiteral>, idsToActivate: number[]): Promise<UpdateResult> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        // Activate the entities with the validated IDs
        const result = await databaseService.getRepository(entity).createQueryBuilder().update().set({ isActive: true }).where('id IN (:...ids)', { ids: idsToActivate }).execute();

        return result;

    } catch (error) {

        throw error;

    }
};

export default activateEntityRecords;
