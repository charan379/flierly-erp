import HttpCodes from "@/constants/httpCodes";
import { getUserPrivileges } from "@/lib/aggregation-pipelines/get-user-privileges.pipeline";
import FlierlyException from "@/lib/flierly.exception";
import { CustomJwtPayload, verifyJwtToken } from "@/lib/jwt";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function authorize(permissionCode: string = ""): (req: Request, res: Response, next: NextFunction) =>
    Promise<void | Response> {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            next();
        } catch (error) {
            next();
        }

        // try {
        //     // Get authorization header value from request
        //     const authHeader: string =
        //         req?.headers?.authorization || req?.signedCookies?.auth;
        //     // if authorization header not present throw exception
        //     if (!authHeader) throw new FlierlyException('Invalid request headers', HttpCodes.UNAUTHORIZED, 'Token Not Provided at headers or cookies', 'Invalid-authorization-header-authorization-middleware');
        //     // bearer authorization header value regex
        //     const bearerTokenRegex: RegExp = new RegExp('^Bearer [A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+$');
        //     // if bearer token not present | or not in format then throw exception
        //     if (!authHeader.match(bearerTokenRegex))
        //         throw new FlierlyException('Invalid Authorization token', HttpCodes.UNAUTHORIZED, 'Authorization headers are not in bearer format', 'Invalid-authorization-header-authorization-middleware');
        //     // extract bearer token from authorization header
        //     const bearerToken: string = authHeader.split(" ")[1];
        //     // verifyJwtToken and de-code token details
        //     const deCodedToken: CustomJwtPayload = await verifyJwtToken(bearerToken);
        //     // extract username from de-coded token details
        //     const jwtUserName: string | undefined = deCodedToken.username;
        //     // extract userIf from de-coded token details
        //     const jwtUserId: mongoose.ObjectId | undefined = deCodedToken.userId;
        //     // fetch user details from DB using username
        //     const user: User | null = await UserModel.findOne(
        //         { _id: jwtUserId },
        //         { __v: 0 },
        //         { autopopulate: true })
        //         .where('isDeleted', false).exec();
        //     // Throw error if user does not exist
        //     if (user === null)
        //         throw new FlierlyException("Invalid userId", HttpCodes.UNAUTHORIZED, "Can't find user with provided userId", "authorization-middleware-invalid-userId");
        //     // assign username to request so that it can be used in further flow
        //     req.username = user.username;
        //     // assign userId to request so that it can be used in further flow
        //     req.userId = user._id;
        //     // Throw error if user is inactive
        //     if (!user.isActive)
        //         throw new FlierlyException("Inactive user", HttpCodes.UNAUTHORIZED, "User is not activated", "authorization-middleware-inactive-user");
        //     // Check if permissions to be checked
        //     if (permissionCode === "") {
        //         next();
        //     } else {
        //         // extract permissions from user permissions, user roles and remove excluded permissions of user from extracted permissions
        //         const userPermissions = await getUserPrivileges(user._id);
        //         // if permissions contain required permission code then continue to next function
        //         if (userPermissions.privilegeCodes.has(permissionCode))
        //             next();
        //         else
        //             // if permissions does not contain required permission code then throw exception
        //             throw new FlierlyException("Insufficient Permissions, Access Blocked !", HttpCodes.UNAUTHORIZED, "User doen't contain the required permissions", "authorization-middleware-insufficient-permissions");

        //     }
        // } catch (error) {
        //     // if any error happens pass it to next function
        //     next(error);
        // }
    }
}