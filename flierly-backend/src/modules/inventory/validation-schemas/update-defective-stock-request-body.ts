import Joi from "joi";
import { UpdateOnHandRequestBody } from "../@types/request-data.types";
import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";

export const updateOnHandSchema: Joi.ObjectSchema<UpdateOnHandRequestBody> = Joi.object({
    productId: Joi.number().required(),
    branchId: Joi.number().required(),
    quantity: Joi.number().required(),
    updateType: Joi.string().valid("add", "remove").required(),
    transactionType: Joi.string()
        .valid(
            InventoryStockTransactionType.MANUAL_ADJUSTMENT,
            InventoryStockTransactionType.PURCHASE_INVOICE,
            InventoryStockTransactionType.PURCHASE_RETURN_OK,
            InventoryStockTransactionType.SALES_RETURN_OK,
            InventoryStockTransactionType.SALES_INVOICE,
            InventoryStockTransactionType.STOCK_DISPOSAL
        )
        .required(),
    reason: Joi.string().required(),
    referenceId: Joi.string().required(),
    serialNumber: Joi.string().optional(),
    transactionManager: Joi.any().optional(),
});