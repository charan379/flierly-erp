import HttpCodes from "@/constants/httpCodes";
import apiResponse from "@/utils/api/responseGenerator";
import errrorMessageGenerator from "@/utils/errror-message.generator";
import { NextFunction, Request, Response } from "express";

/**
 * Wraps an asynchronous route handler with error handling logic.
 * 
 * @param {Function} fn - The asynchronous route handler function.
 * @param {string} entityCode - The entity code used for logging and error identification.
 * @returns {Function} - A function that wraps the route handler with error handling.
 */
export function errorBoundary(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>, entityCode: string): (req: Request, res: Response, next: NextFunction) =>
    Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            const errorMsg: ErrorMessage = errrorMessageGenerator(error);
            switch (errorMsg.name) {
                case 'ValidationError':
                    // ValidationError
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse({
                        success: false,
                        result: null,
                        message: errorMsg.message,
                        controller: `${entityCode}.${fn.name}`,
                        error: errorMsg,
                        httpCode: HttpCodes.BAD_REQUEST,
                        req, res
                    }));
                case 'FlierlyException':
                    // FlierlyException
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse({
                        success: false,
                        result: null,
                        message: errorMsg.message,
                        controller: `${entityCode}.${fn.name}`,
                        error: errorMsg,
                        httpCode: HttpCodes.BAD_REQUEST,
                        req, res
                    }));
                case 'QueryFailedError':
                    // QueryFailedError
                    return res.status(HttpCodes.BAD_REQUEST).json(apiResponse({
                        success: false,
                        result: null,
                        message: errorMsg.message,
                        controller: `${entityCode}.${fn.name}`,
                        error: errorMsg,
                        httpCode: HttpCodes.BAD_REQUEST,
                        req, res
                    }))
                default:
                    // Server Error
                    const httpCode = errorMsg?.httpCode ?? HttpCodes.INTERNAL_SERVER_ERROR;
                    return res.status(httpCode).json(apiResponse({
                        success: false,
                        result: null,
                        message: errorMsg.message,
                        controller: `${entityCode}.${fn.name}`,
                        error: errorMsg,
                        httpCode: HttpCodes.BAD_REQUEST,
                        req, res
                    }));
            }
        }
    };
}
