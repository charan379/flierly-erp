import HttpCodes from "@/constants/httpCodes";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const search = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const keys: string | undefined = req.query?.fields ? req.query?.fields as string : 'name';

        const values: string | undefined = req.query?.queries ? req.query?.queries as string : '';

        const fieldsArray = keys.split(",");

        const queriesArrays = values.split(",");

        const query: { $or: object[] } = { $or: [] };

        for (let index = 0; index < fieldsArray.length; index++) {
            const key = fieldsArray[index];
            const value = queriesArrays[index];

            if (key && value) {
                query.$or.push({ [key]: { $regex: new RegExp(value, 'i') } })
            } else {
                continue;
            }
        };


        let result = await model.find({ ...query }).where('isDeleted', false).exec();

        res.status(HttpCodes.OK).json(result);

    } catch (error) {
        next(error);
    }
};

export default search;