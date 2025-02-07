import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import { applySortOrderQB } from "@/lib/database/typeorm/utils";
import applyWhereConditionsQB from "@/lib/database/typeorm/utils/qb-appy-where-conditions.util";
import pageResponseBuilder from "@/utils/builders/page-response.builder";
import { EntityTarget, ObjectLiteral } from "typeorm";
import EntityRecordsPageRequestDTO from "../../dto/EntityRecordsPageRequest.dto";


const entityRecordsPage = async (entity: EntityTarget<ObjectLiteral>, pageRequest: EntityRecordsPageRequestDTO): Promise<Page<object>> => {

    try {
        //  destructure the pageRequest
        const { withDeleted, filters, limit, page, sort, loadRelations } = pageRequest;
        // get entity repository 
        const entityRepository = AppDataSource.getRepository(entity);
        // declare alias for entity to use in the query
        const entityAlias = "entity";
        // create query builder 
        const queryBuilder = entityRepository.createQueryBuilder(entityAlias);
        // if withDeleted is true, then allow soft deleted records to be in the results
        if (withDeleted) {
            queryBuilder.withDeleted();
        }
        // apply realations to be loaded to the query builder
        if (loadRelations && loadRelations.length > 0) {
            loadRelations.forEach((relation) => {
                queryBuilder.leftJoinAndSelect(`${entityAlias}.${relation}`, `${relation}`)
            });
        };

        // apply filters to the query builder
        applyWhereConditionsQB(queryBuilder, 'andWhere', filters, entityAlias);

        // apply sort order to the query builder
        if (sort !== undefined) {
            applySortOrderQB(queryBuilder, { [sort.property]: sort.order });
        }
        // skip and take to get the correct page of results
        queryBuilder.skip((page - 1) * limit).take(limit);

        // Get the paginated and filtered records
        const [results, total] = await queryBuilder.getManyAndCount();

        // build paginated results response
        const pageResponse: Page<object> = pageResponseBuilder(results, page, limit, total, sort);

        return pageResponse;

    } catch (error) {

        throw error;

    }
};

export default entityRecordsPage;