import HttpCodes from '@/constants/http-codes.enum';

/**
 * Custom exception class for flierly application
 */
class FlierlyException extends Error {
  httpCode: HttpCodes;
  reason: string;

  /**
   * Constructor for MoviebunkersException class.
   * @param message - Error message.
   * @param httpCode - HTTP status code.
   * @param reason - Reason for the error.
   * @param stack - Stack trace for the error.
   */
  constructor(message: string, httpCode: HttpCodes, reason: string = '', stack: string = '') {
    // Call the base Error class constructor with the message
    super(message);
    // Set the name of the error class
    this.name = 'FlierlyException';
    // Set the status, reason, and stack properties if provided
    this.httpCode = httpCode;
    this.reason = reason;
    this.stack = stack;
  }
}

export default FlierlyException;
