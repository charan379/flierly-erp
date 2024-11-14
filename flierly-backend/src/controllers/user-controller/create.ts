import HttpCodes from "@/constants/httpCodes";
import { emailSchema, nameMi5Ma50Schema, phoneSchema } from "@/joi-schemas/common.joi.schemas";
import FlierlyException from "@/lib/flierly.exception";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createUserSchema: Joi.ObjectSchema = Joi.object({
    username: nameMi5Ma50Schema.required(),
    email: emailSchema.required(),
    mobile: phoneSchema.required(),
});

const create = async (req: Request, res: Response, next: NextFunction) => {
    // validate new user
    const user: User = await JoiSchemaValidator<User>(createUserSchema, req.body, { abortEarly: false, allowUnknown: false }, "create-user-custom-controller");
    // check if any users exists with same details
    const existingUsers: number = await UserModel.find({
        $or: [
            { username: user.username },
            { email: user.email },
            { mobile: user.mobile }
        ]
    }).where('isDeleted', false).countDocuments();
    // Throw error with any user with same details exists
    if (existingUsers > 0) {
        throw new FlierlyException("User details already exists", HttpCodes.BAD_REQUEST, "Duplicate user creation", "create-user-custom-controller-duplicate-registration");
    }
    // save new user
    const result = await UserModel.create(user);
    // responde with newly registered user details.
    res.status(HttpCodes.CREATED).json(
        apiResponse(
            true,
            result,
            "User Created Successfully",
            "user.create",
            req.url,
            null,
            HttpCodes.OK, req, res)
        );
}

export default create;