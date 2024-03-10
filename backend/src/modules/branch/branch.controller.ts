import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import { createBranchSchema, updateBranchSchema } from './branch-validator.schema';
import branchService from "./branch.service";
import Joi from "joi";
import { NameMi5Ma50Schema, emailSchema, phoneSchema } from "@/lib/common-validator.schema";


async function createBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, {}, "");
        const branch = await branchService.create(data);
        res.status(201).json(branch);
    } catch (error) {
        next(error);
    }
};

async function getBranchById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.fetchById(id);
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }
};

async function getStatusById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.fetchById(id);
        res.status(200).json({ isActive: branch.isActive });
    } catch (error) {
        next(error);
    }
};

async function getExistenceByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const name = await JoiSchemaValidator<string>(NameMi5Ma50Schema.required(), req.params?.name, {}, "");
        res.status(200).json({ exists: await branchService.existsByName(name) });
    } catch (error) {
        next(error)
    }
};

async function getExistenceByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const email = await JoiSchemaValidator<string>(emailSchema.required(), req.params?.email, {}, "");
        res.status(200).json({ exists: await branchService.existsByEmail(email) });
    } catch (error) {
        next(error);
    }
};

async function getExistenceByPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const phone = await JoiSchemaValidator<string>(phoneSchema.required(), req.params?.phone, {}, "");
        res.status(200).json({ exists: await branchService.existsByPhone(phone) });
    } catch (error) {
        next(error);
    }
};

async function updateBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const update = await JoiSchemaValidator<Branch>(updateBranchSchema, req?.body, {}, "");
        const updatedBranch = await branchService.updateById(id, update);
        res.status(200).json(updatedBranch);
    } catch (error) {
        next(error);
    }
}

async function updateBranchAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const addressId = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.addressId, {}, "");
        const updatedBranch = await branchService.updateAddressById(id, addressId);
        res.status(200).json(updatedBranch);
    } catch (error) {
        next(error)
    }
};

async function updateBranchTaxIdentity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const taxIdentityId = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.taxIdentityId, {}, "");
        const updatedBranch = await branchService.updateTaxIdentityById(id, taxIdentityId);
        res.status(200).json(updatedBranch);
    } catch (error) {
        next(error)
    }
};

async function deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = await JoiSchemaValidator<number>(Joi.number().integer().required(), req.params?.id, {}, "");
        const branch = await branchService.deleteById(id);
        res.status(200).json(branch);
    } catch (error) {
        next(error);
    }
};

const branchModuleController = { createBranch, getBranchById, getStatusById, getExistenceByName, getExistenceByEmail, getExistenceByPhone, updateBranch, updateBranchAddress, updateBranchTaxIdentity, deleteBranch };

export default branchModuleController;
