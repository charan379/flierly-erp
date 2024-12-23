import HttpCodes from '@/constants/http-codes.enum';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import generateJoiSchemaFromTypeORM from '@/lib/joi/builders/typeorm-to-joi-schema.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';

/**
 * Creates a new entity record in the database.
 *
 * @param entity - The entity class to create an instance of
 * @param req - Express request object containing the entity data in the body
 * @param res - Express response object
 * @returns Promise resolving to Response containing the created entity
 *
 * @throws ValidationError if the entity data fails validation
 * @throws DatabaseError if the entity cannot be saved
 */
const create = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Get repository for the entity type
  const repo = AppDataSource.getRepository(entity);

  // Extract column metadata for validation schema generation
  const tableColumns = repo.metadata.columns.reduce((acc: Record<string, any>, column) => {
    acc[column.propertyName] = column.type;
    return acc;
  }, {});

  // Validate incoming data against generated schema
  const validatedRow: ObjectLiteral = await JoiSchemaValidator(generateJoiSchemaFromTypeORM(tableColumns), req.body, { abortEarly: false }, 'dynamic-create');

  // Create entity instance with validated data
  const newRow = repo.create(validatedRow);

  // Perform class-validator validation
  const errors = await validate(newRow);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Save the validated entity to database
  const savedRow = await repo.save(newRow);

  // Return success response with created entity
  return res.status(HttpCodes.CREATED).json(
    apiResponseBuilder({
      success: true,
      result: savedRow,
      message: `${repo.metadata.name} created successfully with ID: ${savedRow?.id}`,
      controller: 'CRUD.CreateController',
      httpCode: HttpCodes.CREATED,
      error: null,
      req,
      res,
    }),
  );
};

export default create;
