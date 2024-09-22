import HttpCodes from "@/constants/httpCodes";
import { getUserPrivileges } from "@/lib/aggregation-pipelines/get-user-privileges.pipeline";
import FlierlyException from "@/lib/flierly.exception";
import { generateJwtToken } from "@/lib/jwt";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import apiResponse from "@/utils/api/responseGenerator";
import { Request, Response } from "express";

const refreshAccessToken = async (req: Request, res: Response) => {
    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        controller: "user.refreshAccessToken",
        error: null,
        httpCode: HttpCodes.OK,
        message: "Refresh access token route not implemented",
        result: [],
        req, res
    }));
    // // check if user exists with userId
    // const user: User | null = await UserModel.findOne({ _id: req.userId }, { __v: 0 }, { autopopulate: true }
    // ).where('isDeleted', false).exec();
    // // Throw error if user does not exist
    // if (user === null)
    //     throw new FlierlyException("Invalid userId", HttpCodes.UNAUTHORIZED, "Can't find user with provided username", "refresh-access-token-controller-invalid-userId");
    // // Throw error if user is inactive
    // if (!user.isActive)
    //     throw new FlierlyException("Inactive user", HttpCodes.BAD_REQUEST, "User is not activated", "refresh-access-token-controller-inactive-user");
    // // generate jwt token for further authentication with username
    // const token = await generateJwtToken(user._id, user.username);
    // // tokenExpiresAt
    // const tokenExpiresAt = new Date();
    // tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
    // // response object
    // const response = {
    //     user,
    //     allowedAccess: [...(await getUserPrivileges(user._id)).privilegeCodes],
    //     token,
    //     tokenExpiresAt,
    // }

    // // responde with newly registered user details.
};

export default refreshAccessToken;