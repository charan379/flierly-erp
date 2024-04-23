import HttpCodes from "@/constants/httpCodes";
import buildMongoSortObject, { SortObject } from "@/utils/mongo-sort.builder";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


const search = async (model: mongoose.Model<any>, req: Request, res: Response, next: NextFunction) => {
    try {
        const keys: string | undefined = req.query?.fields ? req.query?.fields as string : 'name';

        const values: string | undefined = req.query?.queries ? req.query?.queries as string : ' ';

        const sort: SortObject = buildMongoSortObject(req.query?.sort as string)

        const limit: number = req.query?.limit ? parseInt(req.query?.limit as string) : 20;

        const fieldsArray = keys.split(",");

        const queriesArrays = values.split(",");

        const query: { $and: object[] } = { $and: [] };

        for (let index = 0; index < fieldsArray.length; index++) {
            const key = fieldsArray[index];
            const value = queriesArrays[index];

            if (key && value) {
                if (value.match(/^[0-9a-fA-F]{24}$/))
                    query.$and.push({ [key]: value })
                else
                    query.$and.push({ [key]: { $regex: new RegExp(value, 'i') } })
            } else {
                continue;
            }
        };

        let result = await model.find({ ...query }, { __v: 0 })
            .where('isDeleted', false)
            .sort({ ...sort })
            .limit(limit)
            .exec();

        res.status(HttpCodes.OK).json(result);

    } catch (error) {
        next(error);
    }
};

export default search;