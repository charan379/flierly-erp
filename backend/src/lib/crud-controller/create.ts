import HttpCodes from "@/constants/httpCodes";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const create = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await model.create({ ...req.body });
        return res.status(HttpCodes.CREATED).json(result);
    } catch (error) {
        next(error)
    }
}

export default create;