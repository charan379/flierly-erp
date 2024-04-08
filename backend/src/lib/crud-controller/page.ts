import HttpCodes from "@/constants/httpCodes";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const page = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 10;
        const skip: number = (page * limit) - limit;

        const resultsPromise = model.find({ isDeleted: false }, { __v: 0 })
            .skip(skip)
            .limit(limit)
            .exec();

        const countPromise = model.countDocuments(
            { isDeleted: false }
        ).exec();

        const [results, count] = await Promise.all([resultsPromise, countPromise]);

        const pages = Math.ceil(count / limit);

        const pagination = { page, pages, count };

        return res.status(HttpCodes.OK).json({
            results,
            pagination
        });

    } catch (error) {
        next(error);
    }
};

export default page;