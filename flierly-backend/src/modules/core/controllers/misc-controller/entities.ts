import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import filterAndLimit from '@/utils/filter-and-limit-arary-of-objects.util';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { getEntityList } from '@/modules';
import FlierlyException from '@/lib/flierly.exception';

const entityQuerySchema: Joi.ObjectSchema = Joi.object({
  keyword: Joi.string().allow('').default(''),
  limit: Joi.number().default(50),
});

const entities = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {

    const { keyword, limit } = await JoiSchemaValidator<{ keyword: string; limit: number }>(
      entityQuerySchema,
      req.query,
      { abortEarly: false },
      'misc-controller-get-entities',
    );

    try {

      const matcher = new RegExp(String(keyword.trim()), 'i');

      let entities: EntityDetails[] = await getEntityList();

      entities = filterAndLimit<EntityDetails>({
        data: entities,
        limit,
        matcher,
        queryKey: 'entity',
      });

      entities.forEach((entity) => (entity.filePath = '[REDACTED]'));

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
    } catch (error) {
      if (error instanceof FlierlyException) {
        throw error;
      } else {
        throw new FlierlyException((error as Error).message, HttpCodes.BAD_REQUEST, JSON.stringify(error));
      }
    }
  } catch (error) {

    return next(error);

  }
};

export default entities;
