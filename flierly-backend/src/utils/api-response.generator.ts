import { Request, Response } from "express";

/**
 * @deprecated
 * @param success 
 * @param result 
 * @param message 
 * @param controller 
 * @param requestUrl 
 * @param error 
 * @param httpCode 
 * @param req 
 * @param res 
 * @returns 
 */
function apiResponse(
    success: boolean,
    result: string | number | null | object | any[],
    message: string,
    controller: string,
    requestUrl: string,
    error: string | Error | null | ErrorMessage,
    httpCode: number,
    req: Request,
    res: Response,
): ApiResponse {
    res.locals.success = success;
    res.locals.message = message;
    res.locals.controller = controller;
    return {
        success,
        result,
        message,
        controller,
        requestUrl,
        error,
        httpCode,
    };
}

export default apiResponse;
