import HttpCodes from '@/constants/http-codes.enum';
import getEntityList from '@/entities';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import pageResponseBuilder from '@/utils/builders/page-response.builder';
import { qbFilters, qbSortOrder } from '@/lib/typeorm/utils';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';

// Define the request body schema for validation
interface AssociatedEntityRecordsPageRequestBody {
  owningEntityId: number;
  owningEntity: string;
  owningSideField: string;
  inverseSideField: string;
  pagination: { page: number; limit: number };
  sort: { [key: string]: 'ascend' | 'descend' };
  filters: FilterObject;
  type: 'allocated' | 'unallocated';
}

// Joi schema for validating incoming requests
const associatedEntityRecordsPageQuerySchema: Joi.ObjectSchema<AssociatedEntityRecordsPageRequestBody> = Joi.object({
  owningEntityId: Joi.number().integer().min(1).required(),
  owningEntity: Joi.string().disallow('').required(),
  inverseSideField: Joi.string().disallow('').required(),
  owningSideField: Joi.string().disallow('').required(),
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
 * @param inverseEntity - The inverse entity.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The paginated list of associated entity records.
 */
const associatedEntityRecordsPage = async (inverseEntity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate and extract request data
  const { owningEntityId, owningEntity, inverseSideField, owningSideField, filters, pagination, sort, type }: AssociatedEntityRecordsPageRequestBody =
    await JoiSchemaValidator<AssociatedEntityRecordsPageRequestBody>(
      associatedEntityRecordsPageQuerySchema,
      req.body,
      { abortEarly: false, allowUnknown: false },
      'dynamic-fetch-related-entities',
    );

  const inverseRepo = AppDataSource.getRepository(inverseEntity); // Get the repository for the inverse entity
  const inverseEntityAlias = inverseEntity.toString().toLowerCase(); // Determine alias for the inverse entity

  // Build query: join inverse entity with owning entity and filter by owning entity ID
  const qb = inverseRepo.createQueryBuilder(inverseEntityAlias);

  // If type is 'allocated', join with the owning entity to get rows that are allocated
  if (type === 'allocated') {
    qb.innerJoin(`${inverseEntityAlias}.${inverseSideField}`, owningEntity, `${owningEntity}.id = ${owningEntityId}`); // Join the owning entity with the inverse entity
  } else {
    const entities = await getEntityList();
    const oe = entities.find((e) => e.code === owningEntity);

    if (oe === undefined) throw new FlierlyException('Invalid owning entity', HttpCodes.BAD_REQUEST);

    const metadata = AppDataSource.getMetadata(oe?.entity);
    const relation = metadata.findRelationWithPropertyPath(owningSideField);

    if (!relation) throw new FlierlyException('Invalid owning side field', HttpCodes.BAD_REQUEST);

    const joinTable = relation.joinTableName;

    const referencedColumnId = relation.joinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

    const inverseSideReferencedColumnId = relation.inverseJoinColumns.find((column) => column.referencedColumn?.propertyPath === 'id');

    if (!referencedColumnId) throw new FlierlyException('No ReferencedColumn with id at owning side', HttpCodes.BAD_REQUEST);

    if (!inverseSideReferencedColumnId) throw new FlierlyException('No ReferencedColumn with id at inverse side', HttpCodes.BAD_REQUEST);

    qb.leftJoin(
      `${joinTable}`, // Join the join table directly
      `${joinTable}`, // Alias for the join table
      `${joinTable}.${inverseSideReferencedColumnId.databaseName} = ${inverseEntityAlias}.id AND ${joinTable}.${referencedColumnId.databaseName} = :owningEntityId`,
      { owningEntityId },
    ).where(`${joinTable}.${referencedColumnId.databaseName} IS NULL`); // Exclude allocated privileges
  }

  qb.skip((pagination.page - 1) * pagination.limit) // Apply pagination (offset)
    .take(pagination.limit); // Limit results

  qbSortOrder(qb, sort); // Apply sorting based on request
  qbFilters(qb, inverseEntityAlias, filters); // Apply filters based on request

  // Execute the query and get paginated results
  const [results, total] = await qb.getManyAndCount();

  // Build response object with pagination data
  const page: PageResult = await pageResponseBuilder(results, pagination.page, pagination.limit, total, sort);

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
