import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['request.headers.authorization'],
    censor: '**GDPR COMPLIANT**',
  },
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
          colorizeObjects: true,
          messageFormat: '{httpMethod} | {url} | {statusCode} {statusMessage} | {success} | {timeTaken}ms | {controller} | {msg} | {username} | {reqId}',
          hideObject: true,
          singleLine: false,
          translateTime: true,
          timestampKey: 'timestamp',
        },
      },
      {
        level: 'trace',
        target: 'pino/file',
        options: { destination: './pino-logger.log' },
      },
    ],
  },
});

const ReqResLogger = pinoHttp({
  // Reuse an existing logger instance
  logger: logger,

  quietReqLogger: true, // turn off the default logging output

  // Define a custom request id function
  genReqId: function (req: Request, res: Response) {
    const existingID = req.id ?? req.headers['x-request-id'];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },

  // Define custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },

  // Set to `false` to prevent standard serializers from being wrapped.
  wrapSerializers: true,

  // Logger level is `info` by default
  // useLevel: 'info',

  // Define a custom logger level
  customLogLevel: function (req: Request, res: Response, err: any) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },

  // Define a custom success message
  customSuccessMessage: function (req: Request, res: Response) {
    if (res.statusCode === 404) {
      return 'resource not found';
    }
    return res.locals.message;
  },

  // Define a custom receive message
  customReceivedMessage: function (req: Request, res: Response) {
    return 'request received: ' + req.method;
  },

  // Define a custom error message
  customErrorMessage: function (req: Request, res: Response, err: Error) {
    return 'request errored with status code: ' + res.statusCode;
  },

  // Override attribute keys for the log object
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },

  // Define additional custom request properties
  customProps: function (req: Request, res: Response) {
    return {
      username: req?.username,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'medium' }),
      httpMethod: req.method,
      url: req.url,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
      remoteFamily: req.socket.remoteFamily,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      success: res.locals.success,
      message: res.locals.message,
      controller: res.locals.controller,
    };
  },
});

export default ReqResLogger;
