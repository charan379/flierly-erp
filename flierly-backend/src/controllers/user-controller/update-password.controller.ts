import { Request, Response } from 'express';
import { User } from '@/entities/iam/User.entity'; // Adjust the import path as needed
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import Joi from 'joi';
import { idSchema, passwordSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import FlierlyException from '@/lib/flierly.exception';
import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import updateUserPasswordService from '@/service/iam/update-user-password.service';

export const credentialsSchema: Joi.ObjectSchema = Joi.object({
  userId: idSchema,
  password: passwordSchema.required(),
});

const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  const credentials: { userId: number; password: string } = await JoiSchemaValidator(
    credentialsSchema,
    req.body,
    { abortEarly: false, allowUnknown: false },
    'update-user-password-controller',
  );

  // Check if user exists
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: credentials.userId } });

  if (user === null) {
    throw new FlierlyException('Invalid User ID !', HttpCodes.BAD_REQUEST, "Can't find user with provided user id", 'update-user-password-controller-invalid-user-id');
  }

  // Update user password
  const message = await updateUserPasswordService(credentials.userId, credentials.password);

  // responde with newly registered user details.
  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      controller: 'user.update-password',
      error: null,
      httpCode: HttpCodes.OK,
      message: message,
      result: message,
      req,
      res,
    }),
  );
};

export default updatePassword;
