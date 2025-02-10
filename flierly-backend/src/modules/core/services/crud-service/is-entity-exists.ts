import { EntityTarget, ObjectLiteral } from "typeorm";
import applyWhereConditionsQB from "@/lib/database/typeorm/utils/qb-appy-where-conditions.util";
import IsEntityRecordExistsRequestDTO from "../../dto/IsEntityRecordExistsRequest.dto";
import iocContainer from "@/lib/di-ioc-container";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

const isEntityExists = async (entity: EntityTarget<ObjectLiteral>, request: IsEntityRecordExistsRequestDTO): Promise<{ exists: boolean }> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        const { filters, withDeleted } = request;

        const entityRepository = databaseService.getRepository(entity);

        const entityAlias = "entity"

        // Create query builder for the entity
        const queryBuilder = entityRepository.createQueryBuilder(entityAlias);

        // Apply filters to the query builder
        applyWhereConditionsQB(queryBuilder, "andWhere", filters, entityAlias);

        if (withDeleted) {
            queryBuilder.withDeleted();
        }

        queryBuilder.take(1);

        const count = await queryBuilder.getCount();

        return { exists: count > 0 }
    } catch (error) {
        throw error;
    }
};

export default isEntityExists;