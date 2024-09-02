import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import errrorMessageGenerator from "@/utils/errror-message.generator";
import apiResponse from "@/utils/api-response.generator";

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    // set locals, only in development
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    const response = errrorMessageGenerator(error);

    if (req.app.get('env') === 'development')
        console.log(error);

    res.status(response.httpCode).json(
        apiResponse(
            false,
            null,
            response.message,
            ``,
            req.url,
            response,
            response.httpCode, req, res));
}

export default errorHandler;