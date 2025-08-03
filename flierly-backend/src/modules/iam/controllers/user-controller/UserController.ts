import { NextFunction, Request, Response } from "express";

export default interface UserController {
    authenticate(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    updatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}