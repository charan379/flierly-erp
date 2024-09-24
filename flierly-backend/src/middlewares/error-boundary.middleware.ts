import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api-response.generator";
import errrorMessageGenerator from "@/utils/errror-message.generator";
import { NextFunction, Request, Response } from "express";


export function errorBoundary(fn: (req: Request, res: Response, next: NextFunction) =>
    Promise<any>, modelName: string): (req: Request, res: Response, next: NextFunction) =>
        Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            const errorMsg: ErrorMessage = errrorMessageGenerator(error);
            switch (errorMsg.name) {
                case 'ValidationError':
                    // ValidationError
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse(false, null, 'Required fields are not supplied', `${modelName}.${fn.name}`, req.url, errorMsg, HttpCodes.BAD_REQUEST, req, res));
                case 'FlierlyException':
                    // FlierlyException
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse(false, null, errorMsg.message, `${modelName}.${fn.name}`, req.url, errorMsg, HttpCodes.BAD_REQUEST, req, res));
                default:
                    // Server Error
                    const httpCode = errorMsg?.httpCode ?? HttpCodes.INTERNAL_SERVER_ERROR;
                    return res.status(httpCode).json(apiResponse(false, null, errorMsg.message, `${modelName}.${fn.name}`, req.url, errorMsg, httpCode, req, res));
            }
        }
    };
}
