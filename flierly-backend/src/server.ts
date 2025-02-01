import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});
import 'reflect-metadata';
import './lib/di-ioc-container';
import app from '@/app';
import dotenv from 'dotenv';
import http, { Server } from 'http';
import { HttpError } from 'http-errors';
import { EnvConfig } from './config/env';
import validateEnv from './lib/env-validator';
import iocContainer from './lib/di-ioc-container';
import DatabaseService from './lib/database/database-service/DatabaseService';
import BeanTypes from './lib/di-ioc-container/bean.types';
import LoggerService from './modules/core/services/logger-service/LoggerService';

dotenv.config();

// validate environment variables
validateEnv();

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(EnvConfig.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server: Server = http.createServer(app);

/**
 * Start Express server on provided port
 */
server.listen(port);

// get database service instance from ioc container
const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

// get logger service instance from ioc container
const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
const loggerMeta = { service: "Server" };
/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', async (error: HttpError) => {
  // disconnect database connection
  await databaseService.disconnect();

  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`Port ${port} requires elevated privileges`, { error, loggerMeta });
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`Port ${port} is already in use`, { error, loggerMeta });
      process.exit(1);
    default:
      logger.error(`Error occurred: ${(error as Error)?.message}`, { error, loggerMeta });
      process.exit(1);
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', async () => {

  try {
    // establish database connection
    await databaseService.connect();
  } catch (error) {
    logger.error(`🚀 Failed to start server.\n${(error as Error).name ?? "Error"}: ${(error as Error)?.message}`, loggerMeta);
    process.exit(1);
  }

  logger.info(`🚀 Server started is running on ${port}`, loggerMeta);
});

/**
 * Normalize a port into a number, string, or false.
 * if port is not specified in environment, or if provided a string
 */
function normalizePort(val: string | number): number {
  const defaultPort = 3000;

  const port = parseInt(String(val), 10);

  if (typeof port !== 'number') {
    return defaultPort;
  }

  if (isNaN(port)) {
    return defaultPort;
  }

  if (port >= 0) {
    return port;
  }

  return defaultPort;
}
