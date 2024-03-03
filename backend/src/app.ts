import express, { Express, NextFunction, Request, Response, } from "express";
import prisma from "./lib/prisma";
import { Prisma } from "@prisma/client";


// create express application instance
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/org', async (req: Request, res: Response, next: NextFunction) => {
    const data: Prisma.OrganizationCreateInput = req.body;
    console.log(data, req.body);
    const org = await prisma.organization.create({
        data: data
    });
    res.status(201).json(org);
});

app.get('/api/org/:id', async (req: Request, res: Response, next: NextFunction) => {
    const org = await prisma.organization.findUnique({
        where: {
            id: Number.parseInt(req.params.id),
    }
    })
    res.status(200).json(org);
});

// export express app instance, so it can be used at 'server.ts' to start server
export default app;