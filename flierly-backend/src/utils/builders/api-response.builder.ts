import { Request, Response } from 'express';

interface ApiResponse {
  success: boolean;
  result: string | number | null | object | any[];
  message: string;
  controller?: string;
  requestUrl: string;
  error?: string | Error | null | ErrorMessage;
  httpCode: number;
}

/**
 * Utility function to generate a standardized API response.
 * @param success - Indicates whether the operation was successful.
 * @param result - The result data or payload (can be string, number, object, etc.).
 * @param message - A message describing the outcome.
 * @param controller - The controller or service responsible for the operation.
 * @param error - Any error details if the operation failed, otherwise null.
 * @param httpCode - HTTP status code to send in the response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns The standardized response object.
 */
function apiResponseBuilder({
  success,
  result,
  message,
  controller,
  error,
  httpCode,
  req,
  res,
}: {
  success: boolean;
  result: string | number | null | object | any[];
  message: string;
  controller?: string;
  error?: string | Error | null | ErrorMessage;
  httpCode: number;
  req: Request;
  res: Response;
}): ApiResponse {
  // Set response metadata to be accessible later if necessary (e.g., logging)
  res.locals.success = success;
  res.locals.message = message;
  res.locals.controller = controller;

  // Return the structured API response
  return {
    success, // success
    result, // result data (e.g., saved data)
    message, // success message
    controller, // controller identifier
    requestUrl: req.url, // Access req.url directly here
    error, // error object if any
    httpCode, // HTTP status code (201)
  };
}

export default apiResponseBuilder;
