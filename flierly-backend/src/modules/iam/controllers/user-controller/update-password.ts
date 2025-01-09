import { NextFunction, Request, Response } from 'express';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import updateUserPassword from '@/modules/iam/services/user-service/update-user-password';
import updateUserPasswordRequestBodySchema from '../../validation-schemas/update-user-password-request-body-schema';
import { UpdateUserPasswordRequestBody } from '../../@types/request-data.types';

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const credentials: UpdateUserPasswordRequestBody = await JoiSchemaValidator(
      updateUserPasswordRequestBodySchema,
      req.body,
      { abortEarly: false },
      'UserController.update-password',
    );

    // Update user password
    const message = await updateUserPassword(credentials.userId, credentials.password);

    // responde with newly registered user details.
    return res.status(HttpCodes.OK).json(
      apiResponseBuilder({
        success: true,
        controller: 'UserController.update-password',
        error: null,
        httpCode: HttpCodes.OK,
        message,
        result: message,
        req,
        res,
      }),
    );
  } catch (error) {
    return next(error);
  }
};

export default updatePassword;
