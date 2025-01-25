import ProductStockController from "./ProductStockController";
import { Request, Response, NextFunction } from "express";
import InventoryModuleBeanTypes from "../../ioc-config/bean.types";
import ProductStockService from "../../service/product-stock-service/ProductStockService";
import JoiSchemaValidator from "@/lib/joi/joi-schema.validator";
import { UpdateDefectiveRequestBody, UpdateOnHandRequestBody, UpdateOnOrderRequestBody, UpdateReserveRequestBody } from "../../@types/request-data.types";
import HttpCodes from "@/constants/http-codes.enum";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import { inject, injectable } from "inversify";
import { updateDefectiveSchema } from "../../validation-schemas/update-onhand-stock-request-body";
import { updateOnHandSchema } from "../../validation-schemas/update-defective-stock-request-body";
import { updateOnOrderSchema } from "../../validation-schemas/update-onorder-stock-request-body";
import { updateReserveStockSchema } from "../../validation-schemas/update-reserve-stock-request-body";

@injectable()
class ProductStockControllerImpl implements ProductStockController {

    constructor(
        @inject(InventoryModuleBeanTypes.ProductStockService) private readonly productStockService: ProductStockService,
    ) {

    };

    async updateDefective(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { branchId, productId, quantity, reason, referenceId, transactionType, updateType, serialNumber }: UpdateDefectiveRequestBody = await JoiSchemaValidator(updateDefectiveSchema, req.body, { abortEarly: false }, 'updateDefectiveRequestBody');
            await this.productStockService.updateDefective(productId, branchId, quantity, updateType, transactionType, reason, referenceId, serialNumber);

            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                httpCode: HttpCodes.OK,
                req, res,
                message: "Updated successfully !",
                result: null,
                success: true,
            }))
        } catch (error) {
            next(error);
        }
    };

    async updateReserve(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { branchId, productId, quantity, reason, referenceId, transactionType, updateType, serialNumber }: UpdateReserveRequestBody = await JoiSchemaValidator(updateReserveStockSchema, req.body, { abortEarly: false }, 'UpdateReserveRequestBody');
            await this.productStockService.updateReserve(productId, branchId, quantity, updateType, transactionType, reason, referenceId, serialNumber);

            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                httpCode: HttpCodes.OK,
                req, res,
                message: "Updated successfully !",
                result: null,
                success: true,
            }))
        } catch (error) {
            next(error);
        }
    };

    async updateOnOrder(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { branchId, productId, quantity, reason, referenceId, transactionType, updateType, serialNumber }: UpdateOnOrderRequestBody = await JoiSchemaValidator(updateOnOrderSchema, req.body, { abortEarly: false }, 'UpdateOnOrderRequestBody');
            await this.productStockService.updateOnOrder(productId, branchId, quantity, updateType, transactionType, reason, referenceId, serialNumber);
            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                httpCode: HttpCodes.OK,
                req, res,
                message: "Updated successfully !",
                result: null,
                success: true,
            }))
        } catch (error) {
            next(error);
        }
    };

    async updateOnHand(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const { branchId, productId, quantity, reason, referenceId, transactionType, updateType, serialNumber }: UpdateOnHandRequestBody = await JoiSchemaValidator(updateOnHandSchema, req.body, { abortEarly: false }, 'UpdateOnHandRequestBody');
            await this.productStockService.updateOnHand(productId, branchId, quantity, updateType, transactionType, reason, referenceId, serialNumber);
            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                httpCode: HttpCodes.OK,
                req, res,
                message: "Updated successfully !",
                result: null,
                success: true,
            }))
        } catch (error) {
            next(error);
        }
    };
};

export default ProductStockControllerImpl;