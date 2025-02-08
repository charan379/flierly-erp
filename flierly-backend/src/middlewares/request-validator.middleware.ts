import { EnvConfig } from "@/config/env";
import HttpCodes from "@/constants/http-codes.enum";
import { getEntityList } from "@/modules";
import FlierlyException from "@/lib/errors/flierly.exception";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import buildValidationErrorsResult from "@/utils/builders/validation-errors-result.builder";
import { getMessage as m } from "@/utils/get-message.util";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import iocContainer from "@/lib/di-ioc-container";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

/**
 * Middleware for validating incoming requests using class-validator.
 * 
 * This function dynamically determines the validator class based on the provided 
 * class reference or entity name and validates the specified request object type 
 * (`body`, `query`, or `params`). If validation errors are found, it returns 
 * a 400 Bad Request response with the errors.
 *
 * @param validator - The validator class or entity name for dynamic loading.
 * @param requestObjectType - The part of the request to validate ("body", "query", or "params").
 * @returns Middleware function to validate the request.
 */
export function requestValidator(
    validator: any,
    requestObjectType: "body" | "query" | "params"
): (req: Request, res: Response, next: NextFunction) => Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        // get logger service instance from ioc container
        const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
        const loggerMeta = { service: "RequestValidator" };
        try {
            let ValidatorClass;

            // If the validator is a class (function), use it directly
            if (validator instanceof Function) {
                ValidatorClass = validator;
            }

            // If the validator is a string (entity name), dynamically load the class
            if (typeof validator === "string") {
                const entityPath = (
                    await getEntityList()
                ).filter((e) => e.code === validator)[0]?.filePath
                    ?.replace(/src[\\/](?:entities[\\/])?/, "")
                    .replace(/\{ts,js\}/, EnvConfig.NODE_ENV === "development" ? "ts" : "js");

                const EntityClass = require(`@/entities/${entityPath}`).default;

                if (!EntityClass) {
                    throw new FlierlyException(
                        m('classValidatorNotFound', { validator }),
                        HttpCodes.BAD_REQUEST
                    );
                }

                ValidatorClass = EntityClass;
            }

            // Check if the class instance is valid
            if (req[requestObjectType] === null || req[requestObjectType] === undefined || Array.isArray(req[requestObjectType])) {
                throw new FlierlyException('INVALID_CLASS_INSTACE_TO_VALIDATE', HttpCodes.BAD_REQUEST);
            };

            // Transform incoming request object into the DTO class
            const dtoObject = plainToInstance(ValidatorClass, req[requestObjectType], { enableImplicitConversion: true });

            // Validate the DTO object using class-validator
            const validationErrors = await validate(dtoObject, {
                stopAtFirstError: false,
                forbidUnknownValues: true,
                forbidNonWhitelisted: true,
                whitelist: true,
            });

            // If validation errors exist, build and return a 400 Bad Request response
            if (validationErrors.length > 0) {
                const errorMessages = buildValidationErrorsResult(validationErrors);
                const errorMessage: ErrorMessage = {
                    name: ValidationError.name,
                    httpCode: HttpCodes.BAD_REQUEST,
                    message: JSON.stringify(errorMessages),
                    stack: JSON.stringify(errorMessages),// JSON.stringify to avoid circular references
                }
                return res.status(HttpCodes.BAD_REQUEST).json(
                    apiResponseBuilder({
                        success: false,
                        controller: "",
                        error: errorMessage,
                        httpCode: HttpCodes.BAD_REQUEST,
                        result: errorMessages,
                        message: m('requestValidationFail'),
                        req,
                        res,
                    })
                );
            }

            // If validation passes, attach the validated object to the request
            req[requestObjectType] = dtoObject;
            // console.log(dtoObject);
            logger.debug(`Request validated successfully`, { ...loggerMeta, requestObjectType, dtoObject });
            // Pass control to the next middleware
            return next();
        } catch (error) {
            // Pass any unexpected errors to the error-handling middleware
            return next(error);
        }
    };
};