import { newBranchSchema } from "@/lib/joi/branch.schema";
import { NextFunction, Request, Response } from "express";


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({message: "yeah its working!"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default create;