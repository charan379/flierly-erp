import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import errrorMessageBuilder from '@/utils/builders/errror-message.builder';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import iocContainer from '@/lib/di-ioc-container';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';

const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, _: NextFunction) => {
  // set locals, only in development
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  const errorDetails = errrorMessageBuilder(error);

  // get logger service instance from ioc container
  const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
  const loggerMeta = { service: "ErrorHandler" };

  // Log the error details
  logger.debug(errorDetails.message, { ...loggerMeta, error: errorDetails });

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
