import { NextFunction, Request, Response } from "express";

interface ProductStockController {
    adjust(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

export default ProductStockController;