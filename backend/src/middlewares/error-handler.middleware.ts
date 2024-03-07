import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import errorResponse from "../utils/errror-response.generator";

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    // set locals, only in development
    res.locals.message = req.app.get('env') === 'development' ? error.message : "";
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    const response = errorResponse(error);

    if (req.app.get('env') === 'development')
        console.log(error);
    res.status(response.httpCode).json(response);
}

export default errorHandler;