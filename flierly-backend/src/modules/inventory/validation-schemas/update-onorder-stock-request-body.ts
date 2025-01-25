import Joi from "joi";
import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { UpdateOnOrderRequestBody } from "../@types/request-data.types";

export const updateOnOrderSchema: Joi.ObjectSchema<UpdateOnOrderRequestBody> = Joi.object({
    productId: Joi.number().required(),
    branchId: Joi.number().required(),
    quantity: Joi.number().required(),
    updateType: Joi.string().valid("add", "remove").required(),
    transactionType: Joi.string()
        .valid(
            InventoryStockTransactionType.PURCHASE_ORDER,
            InventoryStockTransactionType.PURCHASE_INVOICE,
            InventoryStockTransactionType.MANUAL_ADJUSTMENT
        )
        .required(),
    reason: Joi.string().required(),
    referenceId: Joi.string().required(),
    serialNumber: Joi.string().optional(),
});