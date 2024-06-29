import HttpCodes from "@/constants/httpCodes";
import { nameMi5Ma50Schema, passwordSchema } from "@/joi-schemas/common.joi.schemas";
import { validateHash } from "@/lib/bcrypt";
import FlierlyException from "@/lib/flierly.exception";
import { generateJwtToken } from "@/lib/jwt";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user.model";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";
import Joi from "joi";

export const credentialsSchema: Joi.ObjectSchema = Joi.object({
    username: nameMi5Ma50Schema.required(),
    password: passwordSchema.required(),
});

const authenticate = async (req: Request, res: Response) => {
    // validate new user
    const credentials: { username: string, password: string } = await JoiSchemaValidator<User>(credentialsSchema, req.body, { abortEarly: false, allowUnknown: false }, "authenticate-user-controller");
    // check if user exists with username
    const user: User | null = await UserModel.findOne({ username: credentials.username }, { __v: 0 }, { autopopulate: false }
    ).where('isDeleted', false).exec();
    // Throw error if user does not exist
    if (user === null)
        throw new FlierlyException("Invalid username", HttpCodes.BAD_REQUEST, "Can't find user with provided username", "authenticate-user-controller-invalid-username");
    // validate credentials with password stored in database
    const isPasswordValid = await validateHash(credentials.password, user.password);
    // Throw error if provided password does not match with password stored in database
    if (!isPasswordValid)
        throw new FlierlyException("Invalid password", HttpCodes.BAD_REQUEST, "Password does not match", "authenticate-user-controller-invalid-password");
    // Throw error if user is inactive
    if (!user.isActive)
        throw new FlierlyException("Inactive user", HttpCodes.BAD_REQUEST, "User is not activated", "authenticate-user-controller-inactive-user");
    // generate jwt token for further authentication with username
    const token = await generateJwtToken(user.username);
    // tokenExpiresAt
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
    // response object
    const response = {
        user,
        token,
        loggedInAt: new Date(),
        tokenExpiresAt
    }

    // responde with newly registered user details.
    res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            response,
            "User Successfully authenticated, and token generated.",
            "user.authenticate",
            req.url,
            null,
            HttpCodes.OK)
    );
};

export default authenticate;