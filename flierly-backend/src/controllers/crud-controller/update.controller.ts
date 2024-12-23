import HttpCodes from '@/constants/http-codes.enum';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import FlierlyException from '@/lib/flierly.exception';

/**
 * Update an entity in the database.
 * @param entity - The entity to update.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The updated entity.
 */
const update = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate the entity ID and request body
  const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, 'dynamic-update');
  const updateData: any = await JoiSchemaValidator<object>(Joi.object().required(), req.body, { abortEarly: false, allowUnknown: false }, 'dynamic-update');

  if (updateData?.id) delete updateData.id; // Ensure the ID field is not part of the update

  const result = await AppDataSource.transaction(async (entityManager) => {
    const repo = entityManager.getRepository(entity);

    // Find the entity by ID to ensure it's loaded and managed
    const existingEntity = await repo.findOne({ where: { id } });

    if (!existingEntity)
      throw new FlierlyException(`${repo.metadata.name} not found with ID: ${id}`, HttpCodes.BAD_REQUEST, `${repo.metadata.name} not found with ID: ${id}, Invalid Update`);

    const updateDataInstance = repo.create(updateData);

    // Merge the update data with the existing entity
    const updatedEntity = repo.merge(existingEntity, updateDataInstance);

    // Save the updated entity (this triggers @BeforeUpdate hooks)
    await repo.save(updatedEntity);

    return updatedEntity; // Return the updated entity
  });

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result,
      message: `${AppDataSource.getRepository(entity).metadata.name} updated successfully with ID: ${id}`,
      controller: 'CRUD.UpdateController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default update;
