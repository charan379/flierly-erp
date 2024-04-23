import HttpCodes from "@/constants/httpCodes";
import { createBranchSchema } from "@/joi-schemas/branch.joi.schema";
import BranchModel from "@/models/branch.model";
import { Branch } from "@/models/interfaces/branch.interface";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";



const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const branch: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, { abortEarly: false, allowUnknown: false }, "create-branch-custom-controller");

        const result = await BranchModel.create({ ...branch });

        res.status(HttpCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
}

export default create;