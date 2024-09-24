import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import errrorMessageGenerator from "@/utils/errror-message.generator";
import apiResponse from "@/utils/api/responseGenerator";

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    // set locals, only in development
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    const errorDetails = errrorMessageGenerator(error);

    if (req.app.get('env') === 'development')
        console.log(error);

    res.status(errorDetails.httpCode).json(apiResponse({
        success: false,
        result: null,
        message: errorDetails.message,
        controller: '',
        error: errorDetails,
        httpCode: errorDetails.httpCode,
        req, res
    }))
}

export default errorHandler;