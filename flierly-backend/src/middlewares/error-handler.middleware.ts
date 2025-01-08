import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import errrorMessageBuilder from '@/utils/builders/errror-message.builder';
import apiResponseBuilder from '@/utils/builders/api-response.builder';

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, _: NextFunction) => {
  // set locals, only in development
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  const errorDetails = errrorMessageBuilder(error);

  if (req.app.get('env') === 'development') console.log(error);

  res.status(errorDetails.httpCode).json(
    apiResponseBuilder({
      success: false,
      result: null,
      message: errorDetails.message,
      controller: '',
      error: errorDetails,
      httpCode: errorDetails.httpCode,
      req,
      res,
    }),
  );
};

export default errorHandler;
