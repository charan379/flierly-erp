import { EntityTarget, ObjectLiteral } from "typeorm";
import { SearchEntityRecordsRequestBody } from "../../@types/request-data.types";
import { AppDataSource } from "@/lib/typeorm/app-datasource";
import applyWhereConditionsQB from "@/lib/typeorm/utils/qb-appy-where-conditions.util";

const searchEntityRecords = async (entity: EntityTarget<ObjectLiteral>, request: SearchEntityRecordsRequestBody): Promise<ObjectLiteral[]> => {
    try {

        const { filters, limit } = request;

        const repository = AppDataSource.getRepository(entity);

        const entityAlias = "entity";

        // Create query builder for the entity
        const queryBuilder = repository.createQueryBuilder(entityAlias);

        // Apply filters to the query builder
        applyWhereConditionsQB(queryBuilder, 'andWhere', filters, entityAlias);

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
