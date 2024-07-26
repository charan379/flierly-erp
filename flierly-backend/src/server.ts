import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@": `${__dirname}`
})
import app from '@/app';
import dotenv from 'dotenv';
import http, { Server } from 'http';
import { HttpError } from 'http-errors';
import validateEnv from '@/utils/env.validator';
import Database from './lib/database';
import Config from './config';

dotenv.config();

// validate environment variables
validateEnv();

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(Config.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server: Server = http.createServer(app);

/**
 * Start Express server on provided port
 */
server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error: HttpError) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
        case "EADDRINUSE":
            console.error(`Port ${port} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', async () => {
    await Database.connect();
    console.info("🚀 [server]: Server started is running on " + port);
});

/**
 * Normalize a port into a number, string, or false.
 * if port is not specified in environment, or if provided a string
 */
function normalizePort(val: any) {
    const defaultPort = 3000;

    const port = parseInt(val, 10);

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