import HttpCodes from '@/constants/http-codes.enum';
import { User } from '@/entities/iam/User.entity';
import { idSchema } from '@/lib/joi/joi-schemas/common.joi.schema';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import { generateJwtToken } from '@/lib/jwt';
import getUserPrivilegeCodes from '@/service/iam/get-user-privilege-codes.service';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { Request, Response } from 'express';

const refreshUserAccessToken = async (req: Request, res: Response) => {
  const userId: number = await JoiSchemaValidator(idSchema, req.userId, {}, 'refresh-access-token-user-controller');
  // check if user exists with username
  const user: User | null = await AppDataSource.getRepository(User).findOneBy({ id: userId });
  // Throw error if user does not exist
  if (user === null)
    throw new FlierlyException('Invalid username', HttpCodes.UNAUTHORIZED, "Can't find user with provided username", 'authenticate-user-controller-invalid-username');
  // Throw error if user is inactive
  if (!user.isActive) throw new FlierlyException('Inactive user', HttpCodes.BAD_REQUEST, 'User is not activated', 'authenticate-user-controller-inactive-user');
  // get user privileges codes
  const userPrivilegesCodes: Set<string> = await getUserPrivilegeCodes(user.id);
  // generate jwt token for further authentication with username and userId
  const token = await generateJwtToken(user.id, user.username);
  // tokenExpiresAt
  const tokenExpiresAt = new Date();
  tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
  // response object
  const response = {
    user,
    allowedAccess: Array.from(userPrivilegesCodes),
    token,
    loggedInAt: new Date(),
    tokenExpiresAt,
  };
  // // responde with new token.
  return res.status(HttpCodes.OK).json(
    apiResponseBuilder({
      success: true,
      controller: 'user.refreshAccessToken',
      error: null,
      httpCode: HttpCodes.OK,
      message: 'Refresh access token refreshed successfully.',
      result: response,
      req,
      res,
    }),
  );
};

export default refreshUserAccessToken;
