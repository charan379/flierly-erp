import HttpCodes from '@/constants/http-codes.enum';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import Joi from 'joi';

interface ReadRequestBody {
  loadRelations: string[];
  id: number;
}

const readQuerySchema: Joi.ObjectSchema<ReadRequestBody> = Joi.object({
  loadRelations: Joi.array().items(Joi.string().disallow('').disallow(null)).unique(),
  id: idSchema,
});

/**
 * Read an entity from the database.
 * @param entity - The entity to read.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the read entity.
 */
const read = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {
  // Validate the request body
  const { id, loadRelations } = await JoiSchemaValidator<ReadRequestBody>(readQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, 'dynamic-read');

  const repo = AppDataSource.getRepository(entity);

  // Find the entity by ID with the specified relations
  const data = await repo.findOne({
    where: { id },
    relations: loadRelations?.length > 0 ? loadRelations : loadRelations,
  });

  if (data === null) throw new FlierlyException(`No rows found with given id: ${id}`, HttpCodes.BAD_REQUEST, '', '');

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: data,
      message: 'Data fetched successfully',
      controller: 'CRUD.READController',
      httpCode: HttpCodes.OK,
      error: null,
      req,
      res,
    }),
  );
};

export default read;
