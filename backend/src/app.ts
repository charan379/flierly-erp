import express, { Express } from "express";


// create express application instance
const app: Express = express();

// export express app instance, so it can be used at 'server.ts' to start server
export default app;