import { NextFunction, Request, Response, Router } from "express";

interface ProductStockController {
    router: Router;
    adjust(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

export default ProductStockController;