import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { NextFunction, Request, Response } from "express";
import { createBranchSchema } from './branch-validator.schema';
import prisma from "@/lib/prisma";


export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log("create");
        const data: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, {}, "");
        console.log(data);
        const branch = await prisma.branch.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                alternatePhone: data.alternatePhone,
                address: { connect: { id: data.addressId } },
                taxIdentity: { connect: { id: data.taxIdentityId } }
            }
        });
        console.log(branch);
        res.status(201).json(branch);
    } catch (error) {
        next(error);
    }
}

export async function testGet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log("Test router working");
        res.status(200).json({ message: "Test router working" });
    } catch (error) {
        next(error);
    }
}