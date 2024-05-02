import HttpCodes from "@/constants/httpCodes";
import { emailSchema, nameMi5Ma50Schema, passwordSchema, phoneSchema } from "@/joi-schemas/common.joi.schemas";
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
        console.log(req.path)
        const user: User = await JoiSchemaValidator<User>(createUserSchema, req.body, { abortEarly: false, allowUnknown: false }, "create-user-custom-controller");

        const result = await UserModel.create({ ...user });

        res.status(HttpCodes.CREATED).json(user);
    } catch (error) {
        next(error);
    }
}

export default create;