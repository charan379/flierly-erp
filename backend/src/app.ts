import express, { Express, NextFunction, Request, Response, } from "express";
import createHttpError from "http-errors";
import router from "@/routes";
import HttpCodes from "@/constants/httpCodes";
import errorHandler from "@/middlewares/error-handler.middleware";

// create express application instance
const app: Express = express();

// set app environment
app.set('env', process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.all("/*", (req, res, next) => {
    console.log(req.path);
    next(createHttpError(HttpCodes.NOT_FOUND));
})

app.use(errorHandler);

// export express app instance, so it can be used at 'server.ts' to start server
export default app;