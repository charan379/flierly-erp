import HttpCodes from "@/constants/httpCodes";
import { Request, Response } from "express";
import mongoose from "mongoose";


const read = async (model: mongoose.Model<any>, req: Request, res: Response) => {
    const result = await model.findOne({
        _id: req.params.id,
        isDeleted: false
    }).exec();

    if (!result) {
        res.status(HttpCodes.BAD_REQUEST).json({ message: `No results found by given id.` })
    } else {
        res.status(HttpCodes.OK).json(result);
    }
}


export default read;