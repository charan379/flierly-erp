import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import { createBranchSchema } from './branch-validator.schema';
import prisma from "@/lib/prisma";

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const data: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, {}, "");
        const branch = prisma.branch.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                alternatePhone: data.alternatePhone,
                addressId: data.addressId,
                taxIdentityId: data.taxIdentityId,
            }
        });
        res.status(201).json(branch);
    } catch (error) {
        next(error);
    }
}