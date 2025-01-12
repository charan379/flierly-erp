import ProductStockController from "./ProductStockController";
import { Request, Response, NextFunction, Router } from "express";
import InventoryModuleBeanTypes from "../../ioc-config/bean.types";
import ProductStockService from "../../service/product-stock-service/ProductStockService";
import JoiSchemaValidator from "@/lib/joi/joi-schema.validator";
import adjustStockRequestBodySchema from "../../validation-schemas/adjust-stock-request-body-schema";
import { AdjustStockRequestBody } from "../../@types/request-data.types";
import HttpCodes from "@/constants/http-codes.enum";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import { inject, injectable } from "inversify";

@injectable()
class ProductStockControllerImpl implements ProductStockController {

    constructor(
        @inject(InventoryModuleBeanTypes.ProductStockService) private readonly productStockService: ProductStockService,
    ) {

    };

    async adjust(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { productId, branchId, quantity, stockType }: AdjustStockRequestBody = await JoiSchemaValidator(adjustStockRequestBodySchema, req.body, { abortEarly: false }, "ProductStockController.adjustStock");

            const result = await this.productStockService.adjustStock(productId, branchId, quantity, stockType);

            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                success: true,
                message: "Stock adjusted successfully !",
                httpCode: HttpCodes.OK,
                result,
                req, res,
            }))
        } catch (error) {
            next(error);
        }
    }
};

export default ProductStockControllerImpl;