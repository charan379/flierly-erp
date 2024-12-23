import { HttpError } from 'http-errors';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import HttpCodes from '@/constants/http-codes.enum';
import FlierlyException from '@/lib/flierly.exception';
import { EnvConfig } from '@/config/env';

// Helper to format Validation Errors from class-validator
function formatValidationErrors (error: ValidationError): string {
  return Object.values(error.constraints || {}).join(', ') || 'Validation error';
}

// Type guard to check if the error is one of the custom error types
function isInstance<T> (error: any, type: new (...args: any[]) => T): error is T {
  return error instanceof type;
}

function errrorMessageBuilder (error: Error | HttpError | FlierlyException | ValidationError | QueryFailedError): ErrorMessage {
  // Default error message structure
  const errorMessage: ErrorMessage = {
    name: 'UnknownError',
    httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
    reason: '',
    stack: EnvConfig.NODE_ENV === 'development' && !isInstance(error, ValidationError) ? error.stack : undefined,
    message: 'INTERNAL SERVER ERROR',
  };

  // Handle FlierlyException
  if (isInstance(error, FlierlyException)) {
    return {
      ...errorMessage,
      name: error.name,
      httpCode: error.httpCode,
      reason: error.reason,
      message: error.message,
    };
  }

  // Handle HttpError
  if (isInstance(error, HttpError)) {
    return {
      ...errorMessage,
      name: error.name,
      httpCode: error.statusCode,
      message: error.message,
    };
  }

  // Handle ValidationError
  if (isInstance(error, ValidationError)) {
    return {
      ...errorMessage,
      name: 'ValidationError',
      httpCode: HttpCodes.BAD_REQUEST,
      reason: formatValidationErrors(error),
      message: 'Validation failed',
    };
  }

  // Handle QueryFailedError
  if (isInstance(error, QueryFailedError)) {
    return {
      ...errorMessage,
      name: 'QueryFailedError',
      httpCode: HttpCodes.BAD_REQUEST,
      reason: error.message,
      message: 'Database query failed',
    };
  }

  // General Error handling
  if (error instanceof Error) {
    return {
      ...errorMessage,
      name: error.name,
      message: error.message,
    };
  }

  return errorMessage;
}

export default errrorMessageBuilder;
