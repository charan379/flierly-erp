import { HttpError } from 'http-errors';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import HttpCodes from '@/constants/http-codes.enum';
import FlierlyException from '@/lib/flierly.exception';
import { EnvConfig } from '@/config/env';
import { getMessage as m } from '../get-message.util';
import buildValidationErrorsResult from './validation-errors-result.builder';

/**
 * Builds a standardized error message from various error types.
 *
 * @param {Error|HttpError|FlierlyException|ValidationError|QueryFailedError} error
 * @returns {ErrorMessage}
 */
function errorMessageBuilder(error: Error | HttpError | FlierlyException | ValidationError | QueryFailedError): ErrorMessage {
  let errorMessage: ErrorMessage;

  // Handle specific error types
  if (error instanceof FlierlyException) {
    errorMessage = handleFlierlyException(error);
  } else if (error instanceof HttpError) {
    errorMessage = handleHttpError(error);
  } else if (error instanceof ValidationError) {
    errorMessage = handleValidationError(error);
  } else if (error instanceof QueryFailedError) {
    errorMessage = handleQueryFailedError(error);
  } else {
    // General Error handling
    errorMessage = handleGeneralError(error);
  }

  return { ...errorMessage, stack: EnvConfig.NODE_ENV === 'development' ? errorMessage.stack : undefined };
}

// Helper functions to handle specific error types
function handleFlierlyException(error: FlierlyException): ErrorMessage {
  return {
    name: FlierlyException.name,
    httpCode: error.httpCode,
    message: error.message,
    stack: error.stack,
  };
}

function handleHttpError(error: HttpError): ErrorMessage {
  return {
    name: HttpError.name,
    httpCode: error.statusCode,
    message: error.message,
    stack: error.stack,
  };
}

function handleValidationError(error: ValidationError): ErrorMessage {
  return {
    name: ValidationError.name,
    httpCode: HttpCodes.BAD_REQUEST,
    message: m('unhandledValidationError'),
    stack: JSON.stringify(buildValidationErrorsResult([error])),
  };
}

function handleQueryFailedError(error: QueryFailedError): ErrorMessage {
  return {
    name: QueryFailedError.name,
    httpCode: HttpCodes.BAD_REQUEST,
    message: error.message,
    stack: error.stack,
  };
}

function handleGeneralError(error: Error): ErrorMessage {
  return {
    name: m('500'),
    message: m('unknownError'),
    stack: error.stack,
    httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
  };
}

export default errorMessageBuilder;