import { EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import applyWhereConditionsQB from "@/lib/database/typeorm/utils/qb-appy-where-conditions.util";
import IsEntityRecordExistsRequestDTO from "../../dto/IsEntityRecordExistsRequest.dto";

const isEntityExists = async (entity: EntityTarget<ObjectLiteral>, request: IsEntityRecordExistsRequestDTO): Promise<{ exists: boolean }> => {
    try {

        const { filters, withDeleted } = request;

        const entityRepository = AppDataSource.getRepository(entity);

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