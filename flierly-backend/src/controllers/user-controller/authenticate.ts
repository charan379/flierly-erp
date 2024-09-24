import HttpCodes from "@/constants/httpCodes";
import { User } from "@/entities/iam/User.entity";
import { UserPassword } from "@/entities/iam/UserPassword.entity";
import { nameMi5Ma50Schema, passwordSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import { validateHash } from "@/lib/bcrypt";
import FlierlyException from "@/lib/flierly.exception";
import { generateJwtToken } from "@/lib/jwt";
import getUserPrivilegeCodes from "@/lib/sql-queries/iam/getUserPrivilegeCodes";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";

export const credentialsSchema: Joi.ObjectSchema = Joi.object({
    username: nameMi5Ma50Schema.required(),
    password: passwordSchema.required(),
    remember: Joi.boolean().default(false),
});

const authenticate = async (req: Request, res: Response) => {
    // validate new user
    const credentials: { username: string, password: string } = await JoiSchemaValidator(credentialsSchema, req.body, { abortEarly: false, allowUnknown: false }, "authenticate-user-controller");
    // check if user exists with username
    const user: User | null = await AppDataSource.getRepository(User).findOneBy({ username: credentials.username });
    // Throw error if user does not exist
    if (user === null)
        throw new FlierlyException("Invalid username", HttpCodes.UNAUTHORIZED, "Can't find user with provided username", "authenticate-user-controller-invalid-username");
    // Throw error if user is inactive
    if (!user.isActive)
        throw new FlierlyException("Inactive user", HttpCodes.BAD_REQUEST, "User is not activated", "authenticate-user-controller-inactive-user");
    // validate credentials with password stored in database
    const userPassword: UserPassword | null = await AppDataSource.getRepository(UserPassword).findOneBy({ userId: user.id });
    // Throw exception if password not created for user
    if (userPassword === null)
        throw new FlierlyException("User not allowed to login !", HttpCodes.UNAUTHORIZED, "Password not generated for this user", "authenticate-user-controller-password-not-generated");
    // validate hash
    const isPasswordValid = await validateHash(credentials.password, userPassword.password);
    // Throw error if provided password does not match with password stored in database
    if (!isPasswordValid)
        throw new FlierlyException("Invalid password", HttpCodes.BAD_REQUEST, "Password does not match", "authenticate-user-controller-invalid-password");
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
    }

    // responde with newly registered user details.
    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        controller: "user.authenticate",
        error: null,
        httpCode: HttpCodes.OK,
        message: "Authenticated successfully.",
        result: response,
        req, res
    }));
};

export default authenticate;