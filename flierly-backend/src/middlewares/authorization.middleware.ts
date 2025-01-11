import HttpCodes from '@/constants/http-codes.enum';
import User from '@/modules/iam/entities/User.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';
import FlierlyException from '@/lib/flierly.exception';
import { CustomJwtPayload, verifyJwtToken } from '@/lib/jwt';
import getUserPrivilegeCodes from '@/modules/iam/services/user-service/get-user-privilege-codes';
import { NextFunction, Request, Response } from 'express';
import { getMessage as m } from '@/utils/get-message.util';

/**
 * Middleware to authorize requests based on JWT tokens and user privileges.
 *
 * This middleware performs the following steps:
 * 1. Validates the presence and format of the authorization header or signed cookie.
 * 2. Decodes and verifies the provided JWT token.
 * 3. Validates the existence and status of the associated user in the database.
 * 4. Checks if the user has the required privilege code (if provided).
 * 5. Attaches `username` and `userId` to the request object for downstream usage.
 *
 * @param privilegeCode - Optional privilege code required for the request. If empty, only token validation is performed.
 * @returns Middleware function for authorization.
 */
export function authorize(privilegeCode: string = ''): (req: Request, res: Response, next: NextFunction) => Promise<void | Response> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract authorization header or signed cookie
      const authHeader: string = req?.headers?.authorization || req?.signedCookies?.auth;

      // If authorization token is not present, throw an exception
      if (!authHeader) {
        throw new FlierlyException(
          m('invalidAuthorizationHeader'),
          HttpCodes.UNAUTHORIZED,
          "Authorization header or signedCookies.auth not provided !",
        );
      }

      // Regex pattern to validate Bearer token format
      const bearerTokenRegex: RegExp = /^Bearer [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

      // Validate the format of the authorization token
      if (!authHeader.match(bearerTokenRegex)) {
        throw new FlierlyException(
          m('invalidAuthorizationToken'),
          HttpCodes.UNAUTHORIZED,
          'Authorization headers are not in Bearer format',
        );
      }

      // Extract the actual token from the Bearer header
      const bearerToken: string = authHeader.split(' ')[1];

      // Verify the JWT token and decode its payload
      const deCodedToken: CustomJwtPayload = await verifyJwtToken(bearerToken);

      // Extract username and userId from the decoded token
      const jwtUserName: string | undefined = deCodedToken.username;
      const jwtUserId: number | undefined = deCodedToken.userId;

      // Fetch user details from the database using the decoded userId
      const user: User | null = await AppDataSource.getRepository(User).findOneBy({ id: jwtUserId });

      // If no user is found, throw an exception
      if (!user) {
        throw new FlierlyException(
          m('userNotFound'),
          HttpCodes.UNAUTHORIZED,
          m('userNotFound', { userId: String(jwtUserId) }),
        );
      }

      // Attach `username` and `userId` to the request object for further processing
      req.username = user.username;
      req.userId = user.id;

      // If the user is inactive, throw an exception
      if (!user.isActive) {
        throw new FlierlyException(
          m('userInactive'),
          HttpCodes.UNAUTHORIZED,
          m('userInactive'),
        );
      }

      // If no privilege code is provided, skip privilege validation and proceed
      if (privilegeCode === '') {
        return next();
      } else {
        // Retrieve all privilege codes assigned to the user
        const userPrivilegeCodes: Set<string> = await getUserPrivilegeCodes(user.id);

        // If the user has the required privilege, proceed
        if (userPrivilegeCodes.has(privilegeCode)) {
          return next();
        } else {
          // If the user lacks the required privilege, throw an exception
          throw new FlierlyException(
            m('insufficientPermissions'),
            HttpCodes.UNAUTHORIZED,
            m('privilegeCheckFailed', { privilege: privilegeCode }),
          );
        }
      }
    } catch (error) {
      // Pass any error to the next middleware for handling
      return next(error);
    }
  };
}
