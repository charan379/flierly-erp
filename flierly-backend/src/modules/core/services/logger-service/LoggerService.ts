import { LogEntry } from "winston";

interface LoggerService {
    log(level: LogEntry['level'], message: string, meta?: LogEntry['meta']): void;
    info(message: string, meta?: LogEntry['meta']): void;
    warn(message: string, meta?: LogEntry['meta']): void;
    error(message: string, meta?: LogEntry['meta']): void;
    debug(message: string, meta?: LogEntry['meta']): void;
    http(message: string, meta?: LogEntry['meta']): void;
};

export default LoggerService;