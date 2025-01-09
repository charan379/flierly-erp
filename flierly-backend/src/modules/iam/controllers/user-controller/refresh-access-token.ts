import HttpCodes from '@/constants/http-codes.enum';
import User from '../../entities/User.entity';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import { generateJwtToken } from '@/lib/jwt';
import getUserPrivilegeCodes from '@/modules/iam/services/user-service/get-user-privilege-codes';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import userService from '../../services/user-service';

const refreshUserAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: number = await JoiSchemaValidator(idSchema, req.userId, {}, 'UserController.refreshAccessToken');

    const result = await userService.refreshUserAccessToken(userId);

    // responde with new token.
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        controller: 'UserController.refreshAccessToken',
        error: null,
        httpCode: HttpCodes.OK,
        message: 'Refresh access token refreshed successfully.',
        result,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error)
  }
};

export default refreshUserAccessToken;
