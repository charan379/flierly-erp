import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import filterAndLimit from '@/utils/filter-and-limit-arary-of-objects.util';
import { NextFunction, Request, Response } from 'express';
import { getEntityList } from '@/modules';
import FlierlyException from '@/lib/errors/flierly.exception';
import { plainToInstance } from 'class-transformer';
import SearchEntityDetailsRequestDTO from '../../dto/SearchEntityDetailsRequest.dto';
import validateClassInstance from '@/lib/class-validator/utils/validate-entity.util';

const entities = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // convert request object to DTO instance
    const requestBodyDTO = plainToInstance(SearchEntityDetailsRequestDTO, req.body, { enableImplicitConversion: true });

    // validate the request DTO
    await validateClassInstance(requestBodyDTO);

    try {
      const matcher = new RegExp(String(requestBodyDTO.keyword.trim()), 'i');

      let entities: EntityDetails[] = await getEntityList();

      entities = filterAndLimit<EntityDetails>({
        data: entities,
        limit: requestBodyDTO.limit,
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
