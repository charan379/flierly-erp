import HttpCodes from "@/constants/httpCodes";
import { emailSchema, nameMi5Ma50Schema, passwordSchema, phoneSchema } from "@/joi-schemas/common.joi.schemas";
import { generateHash } from "@/lib/bcrypt";
import FlierlyException from "@/lib/flierly.exception";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user.model";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createUserSchema: Joi.ObjectSchema = Joi.object({
    username: nameMi5Ma50Schema.required(),
    password: passwordSchema.required(),
    email: emailSchema.required(),
    mobile: phoneSchema.required(),
});

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        // hash/encrypt user password
        const userWithHashedPassword: User = { ...user, password: await generateHash(user.password) };
        // save new user
        const result = await UserModel.create({ ...userWithHashedPassword });
        // responde with newly registered user details.
        res.status(HttpCodes.CREATED).json(result);

    } catch (error) {
        next(error);
    }
}

export default create;