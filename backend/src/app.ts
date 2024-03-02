import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";


// create express application instance
const app: Express = express();

const prisma = new PrismaClient();

// export express app instance, so it can be used at 'server.ts' to start server
export default app;