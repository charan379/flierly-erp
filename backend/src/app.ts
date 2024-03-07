import express, { Express, NextFunction, Request, Response, } from "express";
import prisma from "./lib/prisma";
import { Prisma } from "@prisma/client";
import createHttpError from "http-errors";
import errorHandler from "./middlewares/errorHandler";
import HttpCodes from "./constants/httpCodes";

// create express application instance
const app: Express = express();

// set app environment
app.set('env', process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/org', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: Prisma.OrganizationCreateInput = req.body;
        const org = await prisma.organization.create({
            data: data
        });
        res.status(201).json(org);
    } catch (error) {
        next(error);
    }
});

app.get('/api/org/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const org = await prisma.organization.findUnique({
            where: {
                id: Number.parseInt(req.params.id),
            }
        })
        res.status(200).json(org);
    } catch (error) {
        next(error)
    }
});

app.use((req, res, next) => {
    next(createHttpError(HttpCodes.NOT_FOUND));
})

app.use(errorHandler);

// export express app instance, so it can be used at 'server.ts' to start server
export default app;