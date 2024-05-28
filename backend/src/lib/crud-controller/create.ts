import HttpCodes from "@/constants/httpCodes";
import { Request, Response } from "express";
import mongoose from "mongoose";


const create = async (model: mongoose.Model<any>, req: Request, res: Response) => {
    const result = await model.create({ ...req.body });
    return res.status(HttpCodes.CREATED).json(result);
}

export default create;