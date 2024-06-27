import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api-response.generator";
import errrorMessageGenerator from "@/utils/errror-message.generator";
import { NextFunction, Request, Response } from "express";


export function catchErrors(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>, modelName: string): (req: Request, res: Response, next: NextFunction) => Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            const errorMsg: ErrorMessage = errrorMessageGenerator(error);
            switch (errorMsg.name) {
                case 'ValidationError':
                    // mongoose ValidationError
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse(false, null, 'Required fields are not supplied', `${modelName}.${fn.name}`, errorMsg, HttpCodes.BAD_REQUEST));
                case 'FlierlyException':
                    // FlierlyException
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse(false, null, errorMsg.message, `${modelName}.${fn.name}`, errorMsg, HttpCodes.BAD_REQUEST));
                default:
                    // Server Error
                    const httpCode = errorMsg?.httpCode ?? HttpCodes.INTERNAL_SERVER_ERROR;
                    return res.status(httpCode).json(apiResponse(false, null, errorMsg.message, `${modelName}.${fn.name}`, errorMsg, httpCode));
            }
        }
    };
}
