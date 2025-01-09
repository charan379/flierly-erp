import HttpCodes from "@/constants/http-codes.enum";
import { getEntityList } from "@/modules";
import FlierlyException from "@/lib/flierly.exception";
import { AppDataSource } from "@/lib/typeorm/app-datasource";
import { applySortOrderQB, qbFilters } from "@/lib/typeorm/utils";
import pageResponseBuilder from "@/utils/builders/page-response.builder";
import { EntityTarget, ObjectLiteral } from "typeorm";
import { AssociatedEntityRecordsPageRequestBody } from "../../@types/request-data.types";


const getAssociatedEntityRecordsPage = async (associatedEntity: EntityTarget<ObjectLiteral>, pageRequest: AssociatedEntityRecordsPageRequestBody): Promise<Page<object>> => {
    try {
        const { associatedSideField, entity, entityRecordId, entitySideField, filters, limit, page, sort, type, withDeleted } = pageRequest;
        const associatedEntityRepo = AppDataSource.getRepository(associatedEntity); // Get the repository for the associatedEntity
        const associatedEntityAlias = associatedEntity.toString().toLowerCase(); // Determine alias for the associatedEntity

        // Build query: join inverse entity with owning entity and filter by owning entity ID
        const qb = associatedEntityRepo.createQueryBuilder(associatedEntityAlias);

        // If type is 'allocated', join with the owning entity to get rows that are allocated
        if (type === 'allocated') {
            qb.innerJoin(`${associatedEntityAlias}.${associatedSideField}`, entity, `${entity}.id = ${entityRecordId}`); // Join the entity with the associated entity
        } else {
            const entities = await getEntityList();
            const e = entities.find((e) => e.code === entity);

            if (e === undefined) throw new FlierlyException(
                'Invalid entity',
                HttpCodes.BAD_REQUEST);

            const metadata = AppDataSource.getMetadata(e?.entity);
            const relation = metadata.findRelationWithPropertyPath(entitySideField);

            if (!relation) throw new FlierlyException('Invalid entity side field', HttpCodes.BAD_REQUEST);

            const joinTable = relation.joinTableName;

            const entitySideReferencedColumnId = relation.joinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

            const associatedSideReferencedColumnId = relation.inverseJoinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

            if (!entitySideReferencedColumnId) throw new FlierlyException('No ReferencedColumn with id at entity side', HttpCodes.BAD_REQUEST);

            if (!associatedSideReferencedColumnId) throw new FlierlyException('No ReferencedColumn with id at associated side', HttpCodes.BAD_REQUEST);

            qb.leftJoin(
                `${joinTable}`, // Join the join table directly
                `${joinTable}`, // Alias for the join table
                `${joinTable}.${associatedSideReferencedColumnId.databaseName} = ${associatedEntityAlias}.id AND ${joinTable}.${entitySideReferencedColumnId.databaseName} = :entityRecordId`,
                { entityRecordId },
            ).where(`${joinTable}.${entitySideReferencedColumnId.databaseName} IS NULL`); // Exclude allocated privileges
        }

        qb.skip((page - 1) * limit) // Apply pagination (offset)
            .take(limit); // Limit results

        applySortOrderQB(qb, sort); // Apply sorting based on request
        qbFilters(qb, associatedEntityAlias, filters); // Apply filters based on request

        // Execute the query and get paginated results
        const [results, total] = await qb.getManyAndCount();

        // Build response object with pagination data
        const pageResponse: Page<object> = pageResponseBuilder(results, page, limit, total, sort);

        return pageResponse;
    } catch (error) {
        throw error;
    }
};

export default getAssociatedEntityRecordsPage;