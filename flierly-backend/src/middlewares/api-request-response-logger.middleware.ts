import iocContainer from "@/lib/di-ioc-container";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import { NextFunction, Request, Response } from "express";

const apiRequestResponseLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);

    res.on('close', () => {
        const duration = Date.now() - start;
        // Log the response details
        logger.http(`${req.originalUrl} - ${res.statusCode} - ${duration} ms`, {
            method: req.method,
            url: req.path,
            duration,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });
    });

    next();
};

export default apiRequestResponseLogger;