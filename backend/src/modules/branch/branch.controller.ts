import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import { createBranchSchema } from './branch-validator.schema';
import branchService from "./branch.service";
import Joi from "joi";


async function createBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, {}, "");
        const branch = await branchService.create(data);
        res.status(201).json(branch);
    } catch (error) {
        next(error);
    }
}

async function getBranchById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.fetchById(id);
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }
}

async function getStatusById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.fetchById(id);
        res.status(200).json({ isActive: branch.isActive });
    } catch (error) {
        next(error);
    }
}

async function deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.deleteById(id);
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }
}

async function getExistenceByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const name = await JoiSchemaValidator<string>(Joi.string().required(), req.params?.name, {}, "");
        res.status(200).json({ exists: await branchService.existsByName(name) });
    } catch (error) {
        next(error)
    }
}

async function getExistenceByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = await JoiSchemaValidator<string>(Joi.string().email().required(), req.params?.email, {}, "");
        res.status(200).json({ exists: await branchService.existsByEmail(email) });
    } catch (error) {
        next(error);
    }
};

async function getExistenceByPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const phone = await JoiSchemaValidator<string>(Joi.string().min(10).max(13).required(), req.params?.phone, {}, "");
        res.status(200).json({ exists: await branchService.existsByPhone(phone) });
    } catch (error) {
        next(error);
    }
}

const branchModuleController = { createBranch, getBranchById, getStatusById, deleteBranch, getExistenceByName, getExistenceByEmail, getExistenceByPhone };

export default branchModuleController;
