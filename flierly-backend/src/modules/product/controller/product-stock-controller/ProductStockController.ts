import { NextFunction, Request, Response } from "express";


export default interface ProductStockController {
    transferStockIntraBranch(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    adjustStockBalance(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}