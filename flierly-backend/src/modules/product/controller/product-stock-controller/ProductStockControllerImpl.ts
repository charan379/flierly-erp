import { NextFunction, Request, Response } from "express";
import ProductStockController from "./ProductStockController";
import TransferStockIntraBranchDTO from "../../dto/TransferStockIntraBranch.dto";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import ProductStockService from "../../service/product-stock-service/ProductStockService";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import HttpCodes from "@/constants/http-codes.enum";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";

@injectable()
export default class ProductStockControllerImpl implements ProductStockController {

    constructor(
        @inject(BeanTypes.ProductStockService) private readonly productStockService: ProductStockService,
        @inject(BeanTypes.LoggerService) private readonly logger: LoggerService,
    ) {

    };

    async transferStockIntraBranch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const transferReqDTO: TransferStockIntraBranchDTO = plainToInstance(TransferStockIntraBranchDTO, req.body);

            await validateEntityInstance(transferReqDTO);
            this.logger.debug(`${JSON.stringify(transferReqDTO)}`)
            await this.productStockService.transferStockIntraBranch(transferReqDTO);

            return res.status(HttpCodes.OK).json(apiResponseBuilder({
                success: true,
                message: "Stock transferred successfully",
                result: { message: "Stock transferred successfully" },
                httpCode: HttpCodes.OK,
                req, res
            }));

        } catch (error) {
            return next(error);
        }
    }

}