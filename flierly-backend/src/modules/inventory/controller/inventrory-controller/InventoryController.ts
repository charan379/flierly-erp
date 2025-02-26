import { NextFunction, Request, Response } from "express";

export default interface InventoryController {
    createInventory(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    statistics: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}