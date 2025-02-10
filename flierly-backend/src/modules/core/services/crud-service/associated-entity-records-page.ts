import HttpCodes from "@/constants/http-codes.enum";
import { getEntityList } from "@/modules";
import FlierlyException from "@/lib/errors/flierly.exception";
import { applySortOrderQB, qbFilters } from "@/lib/database/typeorm/utils";
import pageResponseBuilder from "@/utils/builders/page-response.builder";
import { EntityTarget, ObjectLiteral } from "typeorm";
import AssociatedEntityRecordsPageRequestDTO from "../../dto/AssociatedEntityRecordsPageRequest.dto";
import { AssociatedEntityPageRequestType } from "../../constants/associated-entity-page-requestatype.enum";
import iocContainer from "@/lib/di-ioc-container";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

// Fetch a paginated list of associated entity records.
const getAssociatedEntityRecordsPage = async (entity: EntityTarget<ObjectLiteral>, pageRequest: AssociatedEntityRecordsPageRequestDTO): Promise<Page<object>> => {
    try {

        const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);
        // Destructure the pageRequest
        const { associatedEntitySideField, associatedEntityCode, entityRecordId, entitySideField, filters, limit, page, sort, type, withDeleted } = pageRequest;
        // Get the list of entities
        const entityList = await getEntityList();
        // Find the associated entity details
        const associatedEntityDetails = entityList.find((e) => e.code === associatedEntityCode);
        // If no associated entity is found, throw an error
        if (associatedEntityDetails === undefined) throw new FlierlyException("Invalid associated entity", HttpCodes.BAD_REQUEST);
        // Get the associated entity and repository
        const associatedEntity = associatedEntityDetails.entity;
        // Get the repository for the associated entity
        const associatedEntityRepo = databaseService.getRepository(associatedEntity);
        // Determine alias for the associated entity
        const associatedEntityAlias = associatedEntity.toString().toLowerCase();
        // Determine alias for the entity
        const entityAlias = typeof entity === 'function' ? entity.name.toLowerCase() : entity.toString().toLowerCase();

        // Get metadata for the entity and associated entity
        const entityMetadata = databaseService.getMetadata(entity);
        // Find the relation with the entity side field
        const entityRelationWithEntitySideField = entityMetadata.findRelationWithPropertyPath(entitySideField);
        // If no relation is found, throw an error
        if (!entityRelationWithEntitySideField) throw new FlierlyException('Invalid entity side field', HttpCodes.BAD_REQUEST);
        // Get metadata for the associated entity
        const associatedEntityMetadata = databaseService.getMetadata(associatedEntity);
        // Find the relation with the associated entity side field
        const associatedEntityRelationWithEntitySideField = associatedEntityMetadata.findRelationWithPropertyPath(associatedEntitySideField);
        // If no relation is found, throw an error
        if (!associatedEntityRelationWithEntitySideField) throw new FlierlyException('Invalid associated entity side field', HttpCodes.BAD_REQUEST);

        // Build query: join inverse entity with owning entity and filter by owning entity ID
        const qb = associatedEntityRepo.createQueryBuilder(associatedEntityAlias);

        // If type is 'allocated', join with the owning entity to get rows that are allocated
        if (type === AssociatedEntityPageRequestType.ALLOCATED) {
            qb.innerJoin(`${associatedEntityAlias}.${associatedEntitySideField}`, entityAlias, `${entityAlias}.id = ${entityRecordId}`); // Join the entity with the associated entity
        } else {
            const joinTable = entityRelationWithEntitySideField.joinTableName;

            const entitySideReferencedColumnId = entityRelationWithEntitySideField.joinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

            const associatedEntitySideReferencedColumnId = entityRelationWithEntitySideField.inverseJoinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

            if (!entitySideReferencedColumnId) throw new FlierlyException('No ReferencedColumn with id at entity side', HttpCodes.BAD_REQUEST);

            if (!associatedEntitySideReferencedColumnId) throw new FlierlyException('No ReferencedColumn with id at associated side', HttpCodes.BAD_REQUEST);

            // Join the join table with the associated entity and filter by the owning entity ID
            qb.leftJoin(
                `${joinTable}`, // Join the join table directly
                `${joinTable}`, // Alias for the join table
                `${joinTable}.${associatedEntitySideReferencedColumnId.databaseName} = ${associatedEntityAlias}.id AND ${joinTable}.${entitySideReferencedColumnId.databaseName} = :entityRecordId`,
                { entityRecordId },
            ).where(`${joinTable}.${entitySideReferencedColumnId.databaseName} IS NULL`); // Exclude allocated 
        }

        // Apply pagination
        qb.skip((page - 1) * limit) // Apply pagination (offset)
            .take(limit); // Limit results

        // Apply sorting based on request
        if (sort) {
            applySortOrderQB(qb, { [sort.property]: sort.order });
        }

        // Apply filters based on request
        qbFilters(qb, associatedEntityAlias, filters);

        // Include deleted records if requested
        if (withDeleted) qb.withDeleted();
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