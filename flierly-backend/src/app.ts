import express, { Express } from 'express';
import createHttpError from 'http-errors';
import HttpCodes from '@/constants/http-codes.enum';
import errorHandler from '@/middlewares/error-handler.middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import { EnvConfig } from '@/config/env';
import { CorsConfig } from '@/config/cors';
import appRoutes from './router';
import apiRequestResponseLogger from './middlewares/api-request-response-logger.middleware';

dotenv.config();

// create express application instance
const app: Express = express();

app.use(apiRequestResponseLogger);

// set app environment
app.set('env', EnvConfig.NODE_ENV);

// Cros
app.use(cors(CorsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pino logger
// app.use(ReqResLogger);

app.use(appRoutes);

app.all('/*', (req, res, next) => {
  next(createHttpError(HttpCodes.NOT_FOUND));
});

app.use(errorHandler);

// export express app instance, so it can be used at 'server.ts' to start server
export default app;
