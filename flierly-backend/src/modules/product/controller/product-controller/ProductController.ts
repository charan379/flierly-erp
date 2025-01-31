import { NextFunction, Request, Response } from "express";

interface ProductController {
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    availabilityPage(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

export default ProductController;