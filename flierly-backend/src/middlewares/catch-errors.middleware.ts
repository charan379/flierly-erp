import { NextFunction, Request, Response } from "express";


export function catchErrors(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): (req: Request, res: Response, next: NextFunction) => Promise<void | Response> {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'Required fields are not supplied',
                    controller: fn.name,
                    error,
                });
            } else {
                // Server Error
                return res.status(500).json({
                    success: false,
                    result: null,
                    message: error.message,
                    controller: fn.name,
                    error,
                });
            }
        }
    };
}
