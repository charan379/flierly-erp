import HttpCodes from '@/constants/http-codes.enum';
import getEntityList from '@/entities';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import pageResponseBuilder from '@/utils/builders/page-response.builder';
import { qbFilters, applySortOrderQB } from '@/lib/typeorm/utils';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';

// Define the request body schema for validation
interface AssociatedEntityRecordsPageRequestBody {
  entityRecordId: number;
  entity: string;
  entitySideField: string;
  associatedSideField: string;
  pagination: { page: number; limit: number };
  sort: { [key: string]: 'ascend' | 'descend' };
  filters: FilterObject;
  type: 'allocated' | 'unallocated';
}

// Joi schema for validating incoming requests
const associatedEntityRecordsPageQuerySchema: Joi.ObjectSchema<AssociatedEntityRecordsPageRequestBody> = Joi.object({
  entityRecordId: Joi.number().integer().min(1).required(),
  entity: Joi.string().disallow('').required(),
  associatedSideField: Joi.string().disallow('').required(),
  entitySideField: Joi.string().disallow('').required(),
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1), // Default page: 1
    limit: Joi.number().integer().min(1).default(20), // Default limit: 20
  }).default({ page: 1, limit: 20 }), // Default pagination
  sort: Joi.object()
    .pattern(
      Joi.string(), // Allow any key for sort fields
      Joi.string().valid('ascend', 'descend'), // Valid sort orders
    )
    .default({ id: 'ascend' }), // Default sort by 'id' in ascending order
  filters: Joi.object().default({}), // Default: empty filter object
  type: Joi.string().valid('allocated', 'unallocated').default('allocated'),
});

/**
 * Fetch a paginated list of associated entity records.
 * @param associatedEntity - The inverse entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of associated entity records.
 */
const associatedEntityRecordsPage = async (associatedEntity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate and extract request data
  const { entityRecordId, entity, associatedSideField, entitySideField, filters, pagination, sort, type }: AssociatedEntityRecordsPageRequestBody =
    await JoiSchemaValidator<AssociatedEntityRecordsPageRequestBody>(
      associatedEntityRecordsPageQuerySchema,
      req.body,
      { abortEarly: false, allowUnknown: false },
      'dynamic-fetch-related-entities',
    );

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

    if (e === undefined) throw new FlierlyException('Invalid entity', HttpCodes.BAD_REQUEST);

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

  qb.skip((pagination.page - 1) * pagination.limit) // Apply pagination (offset)
    .take(pagination.limit); // Limit results

  applySortOrderQB(qb, sort); // Apply sorting based on request
  qbFilters(qb, associatedEntityAlias, filters); // Apply filters based on request

  // Execute the query and get paginated results
  const [results, total] = await qb.getManyAndCount();

  // Build response object with pagination data
  const page: Page<object> = await pageResponseBuilder(results, pagination.page, pagination.limit, total, sort);

  // Return successful response
  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: page,
      controller: 'CRUD.RelatedEntitiesPageController',
      message: 'Related entities page fetched successfully',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default associatedEntityRecordsPage;
