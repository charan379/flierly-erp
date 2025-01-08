import HttpCodes from '@/constants/http-codes.enum';
import getEntityList from '@/entities';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import filterAndLimit from '@/utils/filter-and-limit-arary-of-objects.util';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';
import Joi from 'joi';

const entityQuerySchema: Joi.ObjectSchema = Joi.object({
  keyword: Joi.string().allow('').default(''),
  limit: Joi.number().default(50),
});

const entities = async (req: Request, res: Response): Promise<Response> => {
  const { keyword, limit } = await JoiSchemaValidator<{ keyword: string; limit: number }>(
    entityQuerySchema,
    req.query,
    { abortEarly: false, allowUnknown: false },
    'misc-controller-get-entities',
  );

  const matcher = new RegExp(String(keyword.trim()), 'ig');

  let entities: EntityDetails[] = await getEntityList();

  entities = filterAndLimit<EntityDetails>({
    data: entities,
    limit,
    matcher,
    queryKey: 'entity',
  });

  // entities.forEach((entity) => (entity.filePath = '[REDACTED]'));

  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      result: entities,
      message: 'Entites fetched successfully',
      controller: 'misc.entities',
      error: null,
      httpCode: HttpCodes.OK,
      req,
      res,
    }),
  );
};

export default entities;
