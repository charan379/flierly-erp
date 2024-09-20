import express, { Express } from "express";
import createHttpError from "http-errors";
import router from "@/routes";
import HttpCodes from "@/constants/httpCodes";
import errorHandler from "@/middlewares/error-handler.middleware";
import dotenv from 'dotenv';
import cors from "cors";
import ReqResLogger from "./middlewares/req-res-logger.middlerware";
import { EnvConfig } from "@/config/env";
import { CorsConfig } from "./config/cors";

dotenv.config();

// create express application instance
const app: Express = express();

// set app environment
app.set('env', EnvConfig.NODE_ENV);

// Cros
app.use(cors(CorsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ReqResLogger);

app.use(router);

app.all("/*", (req, res, next) => {
    // console.debug(req.path);
    next(createHttpError(HttpCodes.NOT_FOUND));
})

app.use(errorHandler);

// export express app instance, so it can be used at 'server.ts' to start server
export default app;