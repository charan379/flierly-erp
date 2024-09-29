import HttpCodes from "@/constants/httpCodes";
import { User } from "@/entities/iam/User.entity";
import { AppDataSource } from "@/lib/app-data-source";
import FlierlyException from "@/lib/flierly.exception";
import { CustomJwtPayload, verifyJwtToken } from "@/lib/jwt";
import getUserPrivilegeCodes from "@/lib/sql-queries/iam/getUserPrivilegeCodes";
import { NextFunction, Request, Response } from "express";

export function authorize(privilegeCode: string = ""): (req: Request, res: Response, next: NextFunction) =>
    Promise<void | Response> {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            // Get authorization header value from request
            const authHeader: string =
                req?.headers?.authorization || req?.signedCookies?.auth;
            // if authorization header not present throw exception
            if (!authHeader) throw new FlierlyException('Invalid request headers', HttpCodes.UNAUTHORIZED, 'Token Not Provided at headers or cookies', 'Invalid-authorization-header-authorization-middleware');
            // bearer authorization header value regex
            const bearerTokenRegex: RegExp = new RegExp('^Bearer [A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+$');
            // if bearer token not present | or not in format then throw exception
            if (!authHeader.match(bearerTokenRegex))
                throw new FlierlyException('Invalid Authorization token', HttpCodes.UNAUTHORIZED, 'Authorization headers are not in bearer format', 'Invalid-authorization-header-authorization-middleware');
            // extract bearer token from authorization header
            const bearerToken: string = authHeader.split(" ")[1];
            // verifyJwtToken and de-code token details
            const deCodedToken: CustomJwtPayload = await verifyJwtToken(bearerToken);
            // extract username from de-coded token details
            const jwtUserName: string | undefined = deCodedToken.username;
            // extract userIf from de-coded token details
            const jwtUserId: number | undefined = deCodedToken.userId;
            // fetch user details from DB using username
            const user: User | null = await AppDataSource.getRepository(User).findOneBy({ id: jwtUserId });
            // Throw error if user does not exist
            if (user === null)
                throw new FlierlyException("Invalid userId", HttpCodes.UNAUTHORIZED, "Can't find user with provided userId", "authorization-middleware-invalid-userId");
            // assign username to request so that it can be used in further flow
            req.username = user.username;
            // assign userId to request so that it can be used in further flow
            req.userId = user.id;
            // Throw error if user is inactive
            if (!user.isActive)
                throw new FlierlyException("Inactive user", HttpCodes.UNAUTHORIZED, "User is not activated", "authorization-middleware-inactive-user");
            // Check if permissions to be checked
            if (privilegeCode === "") {
                next();
            } else {
                // extract permissions from user permissions, user roles and remove excluded permissions of user from extracted permissions
                const userPrivilegeCodes: Set<string> = await getUserPrivilegeCodes(user.id);
                // if permissions contain required permission code then continue to next function
                if (userPrivilegeCodes.has(privilegeCode))
                    next();
                else
                    // if permissions does not contain required permission code then throw exception
                    throw new FlierlyException("Insufficient Permissions, Access Blocked !", HttpCodes.UNAUTHORIZED, "User doen't contain the required permissions", "authorization-middleware-insufficient-permissions");

            }
        } catch (error) {
            // if any error happens pass it to next function
            next(error);
        }
    }
}