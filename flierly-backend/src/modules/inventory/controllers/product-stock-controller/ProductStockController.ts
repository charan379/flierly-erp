import { NextFunction, Request, Response } from "express";

interface ProductStockController {
    updateDefective(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    updateOnHand(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    updateOnOrder(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    updateOnHand(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    updateReserve(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

};

export default ProductStockController;