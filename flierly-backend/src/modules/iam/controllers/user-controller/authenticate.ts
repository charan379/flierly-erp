import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { NextFunction, Request, Response } from 'express';
import authenticateUserRequestBodySchema from '../../validation-schemas/authenticate-user-request-body-schema';
import { AuthenticateUserRequestBody } from '../../@types/request-data.types';
import userService from '../../services/user-service';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate new user
    const credentials: AuthenticateUserRequestBody = await JoiSchemaValidator(
      authenticateUserRequestBodySchema,
      req.body,
      { abortEarly: false },
      'UserController.authenticate',
    );

    const result = await userService.authenticate(credentials.username, credentials.password);

    // responde with newly registered user details.
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        controller: 'UserController.authenticate',
        error: null,
        httpCode: HttpCodes.OK,
        message: 'Authenticated successfully.',
        result,
        req,
        res,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default authenticate;
