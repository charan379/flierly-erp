import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "@/lib/flierly.exception";
import { verifyJwtToken } from "@/lib/jwt";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user.model";
import collectUserPermissions from "@/utils/collect-user-permissions";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export function authorize(permissionCode: string): (req: Request, res: Response, next: NextFunction) =>
    Promise<void | Response> {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get authorization header value from request
            const authHeader: string =
                req?.headers?.authorization || req?.signedCookies?.auth;
            // if authorization header not present throw exception
            if (!authHeader) throw new FlierlyException('Invalid request headers', HttpCodes.BAD_REQUEST, 'Token Not Provided at headers or cookies', 'Invalid-authorization-header-authorization-middleware');
            // bearer authorization header value regex
            const bearerTokenRegex: RegExp = new RegExp('^Bearer [A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+$');
            // if bearer token not present | or not in format then throw exception
            if (!authHeader.match(bearerTokenRegex))
                throw new FlierlyException('Invalid Authorization token', HttpCodes.BAD_REQUEST, 'Authorization headers are not in bearer format', 'Invalid-authorization-header-authorization-middleware');
            // extract bearer token from authorization header
            const bearerToken: string = authHeader.split(" ")[1];
            // verifyJwtToken and de-code token details
            const deCodedToken: JwtPayload = await verifyJwtToken(bearerToken);
            // extract username from de-coded token details (sub value)
            const jwtUserName: string | undefined = deCodedToken.sub;
            // assign username to request so that it can be used in further flow
            req.username = jwtUserName;
            // fetch user details from DB using username
            const user: User | null = await UserModel.findOne(
                { username: jwtUserName },
                { __v: 0 },
                { autopopulate: true })
                .where('isDeleted', false).exec();
            // Throw error if user does not exist
            if (user === null)
                throw new FlierlyException("Invalid username", HttpCodes.BAD_REQUEST, "Can't find user with provided username", "authorization-middleware-invalid-username");
            // Throw error if user is inactive
            if (!user.isActive)
                throw new FlierlyException("Inactive user", HttpCodes.BAD_REQUEST, "User is not activated", "authorization-middleware-inactive-user");
            // extract permissions from user permissions, user roles and remove excluded permissions of user from extracted permissions
            const userPermissions = collectUserPermissions(user);
            // if permissions contain required permission code then continue to next function
            if (userPermissions.has(permissionCode))
                next();
            else
                // if permissions does not contain required permission code then throw exception
                throw new FlierlyException("Insufficient Permissions, Access Blocked !", HttpCodes.UNAUTHORIZED, "User doen't contain the required permissions", "authorization-middleware-insufficient-permissions");

        } catch (error) {
            // if any error happens pass it to next function
            next(error);
        }
    }
}