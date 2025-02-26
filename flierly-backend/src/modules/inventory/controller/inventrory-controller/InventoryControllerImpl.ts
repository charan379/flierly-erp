import { inject, injectable } from "inversify";
import InventoryController from "./InventoryController";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import InventoryService from "../../service/inventory-service/InventoryService";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import HttpCodes from "@/constants/http-codes.enum";
import { NextFunction, Request, Response } from "express";

@injectable()
export default class InventoryControllerImpl implements InventoryController {

    constructor(
        @inject(BeanTypes.InventoryService) private readonly inventoryService: InventoryService,
    ) {

    };

    async createInventory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const inventory = req.body;

            const newInventory = await this.inventoryService.createInventory(inventory);

            return res.status(HttpCodes.CREATED).json(
                apiResponseBuilder({
                    success: true,
                    result: newInventory,
                    message: "Inventory created successfully",
                    controller: "InventoryController",
                    httpCode: HttpCodes.CREATED,
                    req, res
                })
            );
        } catch (error) {
            return next(error);
        }
    }

    async statistics(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const re = req.query;

            const statistics = await this.inventoryService.statistics({ byBranch: re?.byBranch ? parseInt(re?.byBranch as string) : undefined, byProduct: re?.byProduct ? parseInt(re?.byProduct as string) : undefined });

            return res.status(HttpCodes.OK).json(
                apiResponseBuilder({
                    success: true,
                    result: statistics,
                    message: "Inventory statistics",
                    controller: "InventoryController",
                    httpCode: HttpCodes.OK,
                    req, res
                })
            );
        } catch (error) {
            return next(error);
        }
    }
}