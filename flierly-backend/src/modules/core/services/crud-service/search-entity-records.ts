import { EntityTarget, ObjectLiteral } from "typeorm";
import applyWhereConditionsQB from "@/lib/database/typeorm/utils/qb-appy-where-conditions.util";
import SearchEntityRecordsRequestDTO from "../../dto/SearchEntityRecordsRequest.dto";
import { applySortOrderQB } from "@/lib/database/typeorm/utils";
import iocContainer from "@/lib/di-ioc-container";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

const searchEntityRecords = async (entity: EntityTarget<ObjectLiteral>, request: SearchEntityRecordsRequestDTO): Promise<ObjectLiteral[]> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

        const { filters, limit, withDeleted, sort } = request;

        const entityRepository = databaseService.getRepository(entity);

        const entityAlias = "entity";

        // Create query builder for the entity
        const queryBuilder = entityRepository.createQueryBuilder(entityAlias);

        if (withDeleted) {
            queryBuilder.withDeleted();
        };

        // Apply filters to the query builder
        applyWhereConditionsQB(queryBuilder, 'andWhere', filters, entityAlias);

        // Apply sorting
        if (sort) {
            applySortOrderQB(queryBuilder, { [sort.property]: sort.order });
        }

        // Apply (take for offset and limit)
        queryBuilder.take(limit);

        // Get the paginated and filtered users
        const results = await queryBuilder.getMany();

        return results;

    } catch (error) {

        throw error;

    }
};

export default searchEntityRecords;
