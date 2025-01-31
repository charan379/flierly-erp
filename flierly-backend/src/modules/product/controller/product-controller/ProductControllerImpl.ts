import { NextFunction, Request, Response } from "express";
import ProductController from "./ProductController";
import { inject, injectable } from "inversify";
import ProductModuleBeanTypes from "../../ioc-config/bean.types";
import ProductService from "../../service/product-service/ProductService";
import HttpCodes from "@/constants/http-codes.enum";
import apiResponseBuilder from "@/utils/builders/api-response.builder";

@injectable()
export default class ProductControllerImpl implements ProductController {

    constructor(
        @inject(ProductModuleBeanTypes.ProductService) private readonly productService: ProductService,
    ) {

    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const result = await this.productService.newProduct(req.body);
            return res.status(HttpCodes.CREATED).json(apiResponseBuilder({
                success: true,
                result,
                message: `Product created successfully !`,
                controller: 'ProductController.create',
                httpCode: HttpCodes.CREATED,
                error: null,
                req,
                res,
            }));
        } catch (error) {
            return next(error);
        }
    };

    async availabilityPage(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        throw new Error("Method not implemented.");
    }

}