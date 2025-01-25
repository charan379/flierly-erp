import Joi from "joi";
import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { UpdateReserveRequestBody } from "../@types/request-data.types";

export const updateReserveStockSchema: Joi.ObjectSchema<UpdateReserveRequestBody> = Joi.object({
    productId: Joi.number().required(),
    branchId: Joi.number().required(),
    quantity: Joi.number().required(),
    updateType: Joi.string().valid("add", "remove").required(),
    transactionType: Joi.string()
        .valid(
            InventoryStockTransactionType.SALES_INVOICE,
            InventoryStockTransactionType.SALES_ORDER,
            InventoryStockTransactionType.MANUAL_ADJUSTMENT
        )
        .required(),
    reason: Joi.string().required(),
    referenceId: Joi.string().required(),
    serialNumber: Joi.string().optional(),
});