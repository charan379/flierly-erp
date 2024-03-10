import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import { createBranchSchema } from './branch-validator.schema';
import branchService from "./branch.service";
import Joi from "joi";


export async function createBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, {}, "");
        const branch = await branchService.create(data);
        res.status(201).json(branch);
    } catch (error) {
        next(error);
    }
}

export async function deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.deleteById(id);
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }
}