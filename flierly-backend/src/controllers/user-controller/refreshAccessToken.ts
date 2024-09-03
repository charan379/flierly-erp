import HttpCodes from "@/constants/httpCodes";
import { nameMi5Ma50Schema } from "@/joi-schemas/common.joi.schemas";
import { getUserPrivileges } from "@/lib/aggregation-pipelines/get-user-privileges.pipeline";
import FlierlyException from "@/lib/flierly.exception";
import { generateJwtToken } from "@/lib/jwt";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";

const refreshAccessToken = async (req: Request, res: Response) => {
    // validate new user
    const username: string = await JoiSchemaValidator(nameMi5Ma50Schema, req.username, { abortEarly: false, allowUnknown: false }, "refresh-access-token-controller");
    // check if user exists with username
    const user: User | null = await UserModel.findOne({ username: username }, { __v: 0 }, { autopopulate: true }
    ).where('isDeleted', false).exec();
    // Throw error if user does not exist
    if (user === null)
        throw new FlierlyException("Invalid username", HttpCodes.UNAUTHORIZED, "Can't find user with provided username", "refresh-access-token-controller-invalid-username");
    // Throw error if user is inactive
    if (!user.isActive)
        throw new FlierlyException("Inactive user", HttpCodes.BAD_REQUEST, "User is not activated", "refresh-access-token-controller-inactive-user");
    // generate jwt token for further authentication with username
    const token = await generateJwtToken(user.username);
    // tokenExpiresAt
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
    // response object
    const response = {
        user,
        allowedAccess: [...(await getUserPrivileges(user._id)).privilegeCodes],
        token,
        tokenExpiresAt,
    }

    // responde with newly registered user details.
    res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            response,
            "Access token successfully refreshed.",
            "user.refresh-access-token",
            req.url,
            null,
            HttpCodes.OK, req, res)
    );
};

export default refreshAccessToken;