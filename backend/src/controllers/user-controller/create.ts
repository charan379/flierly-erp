import HttpCodes from "@/constants/httpCodes";
import { emailSchema, nameMi5Ma50Schema, passwordSchema, phoneSchema } from "@/joi-schemas/common.joi.schemas";
import { generateHash } from "@/lib/bcrypt";
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
        const user: User = await JoiSchemaValidator<User>(createUserSchema, req.body, { abortEarly: false, allowUnknown: false }, "create-user-custom-controller");

        const user_with_hashed_password: User = { ...user, password: await generateHash(user.password) };

        const result = await UserModel.create({ ...user_with_hashed_password });

        res.status(HttpCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
}

export default create;