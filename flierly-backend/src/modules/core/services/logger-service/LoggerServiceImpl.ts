import { EnvConfig } from "@/config/env";
import LoggerService from "./LoggerService";
import { createLogger, format, transports, Logger, LogEntry, http } from 'winston';
import chalk from "chalk";

export default class LoggerServiceImpl implements LoggerService {
    private logger: Logger;

    constructor() {
        this.initializeLogger();
    }

    private initializeLogger() {
        const isProduction = EnvConfig.NODE_ENV === 'production';

        const customFormat = format.printf(({ level, message, timestamp, ...meta }) => {
            const levelColor = this.getLevelColor(level);
            const methodColor = meta.method ? this.getMethodColor(meta.method as string) : levelColor;
            return `[${levelColor(level)}]: ${methodColor(meta.method || '')} ${message} ${JSON.stringify({ timestamp, ...meta })}`;
        });

        this.logger = createLogger({
            level: isProduction ? 'info' : 'debug',
            format: format.combine(
                format.timestamp(),
                format.errors({ stack: true }),
                format.splat(),
                format.json(),
                customFormat
            ),
            defaultMeta: { service: 'LoggerService' },
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize({ all: true }),
                        customFormat
                    )
                }),
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'app.log' })
            ],
        });

        if (isProduction) {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize({ all: true }),
                    customFormat
                )
            }));
        }
    }

    private getLevelColor(level: LogEntry['level']) {
        switch (level) {
            case 'error':
                return chalk.red;
            case 'warn':
                return chalk.yellow;
            case 'info':
                return chalk.green;
            case 'debug':
                return chalk.blue;
            default:
                return chalk.white;
        }
    }

    private getMethodColor(method: string) {
        switch (method) {
            case 'GET':
                return chalk.cyan;
            case 'POST':
                return chalk.magenta;
            case 'PUT':
                return chalk.yellow;
            case 'DELETE':
                return chalk.red;
            case 'PATCH':
                return chalk.green;
            default:
                return chalk.white;
        }
    }

    /**
     * Log a message with a specified level and optional metadata.
     * @param level - The log level (e.g., 'info', 'warn', 'error', 'debug').
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    log(level: LogEntry['level'], message: string, meta?: LogEntry['meta']): void {
        this.logger.log(level, message, meta);
    }

    /**
     * Log an informational message.
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    info(message: string, meta?: LogEntry['meta']): void {
        this.logger.info(message, meta);
    }

    /**
     * Log a warning message.
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    warn(message: string, meta?: LogEntry['meta']): void {
        this.logger.warn(message, meta);
    }

    /**
     * Log an error message.
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    error(message: string, meta?: LogEntry['meta']): void {
        this.logger.error(message, meta);
    }

    /**
     * Log a debug message.
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    debug(message: string, meta?: LogEntry['meta']): void {
        this.logger.debug(message, meta);
    }

    /**
     * Log a http message
     * @param message - The log message.
     * @param meta - Optional metadata to include with the log message.
     */
    http(message: string, meta?: LogEntry["meta"]): void {
        this.logger.http(message, meta);
    }
}