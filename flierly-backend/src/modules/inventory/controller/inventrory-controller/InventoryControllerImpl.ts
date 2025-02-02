import { inject } from "inversify";
import InventoryController from "./InventoryController";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import InventoryService from "../../service/inventory-service/InventoryService";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import HttpCodes from "@/constants/http-codes.enum";
import { NextFunction, Request, Response } from "express";

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
}