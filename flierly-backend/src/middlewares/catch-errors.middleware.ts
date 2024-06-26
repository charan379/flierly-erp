import { NextFunction, Request, Response } from "express";


export function catchErrors(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>, modelName: string): (req: Request, res: Response, next: NextFunction) => Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
            console.log(next)
        } catch (error: any) {
            console.log(next.name)
            const apiResponse: ApiResponse = {
                success: false,
                controller: `${modelName}.${fn.name}`,
                message: '',
                result: null,
                error: null,
                httpCode: 200,
            }
            if (error?.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'Required fields are not supplied',
                    controller: `${modelName}.${fn.name}`,
                    error,
                });
            } else {
                // Server Error
                return res.status(error?.httpCode ?? 500).json({
                    success: false,
                    result: null,
                    message: error.message,
                    controller: `${modelName}.${fn.name}`,
                    error,
                });
            }
        }
    };
}
