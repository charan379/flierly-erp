import Joi from "joi";
import { InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { UpdateOnHandRequestBody } from "../@types/request-data.types";


export const updateDefectiveSchema: Joi.ObjectSchema<UpdateOnHandRequestBody> = Joi.object({
    productId: Joi.number().required(),
    branchId: Joi.number().required(),
    quantity: Joi.number().required(),
    updateType: Joi.string().valid("add", "remove").required(),
    transactionType: Joi.string()
        .valid(
            InventoryStockTransactionType.SALES_RETURN_DEFECTIVE,
            InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE,
            InventoryStockTransactionType.MANUAL_ADJUSTMENT
        )
        .required(),
    reason: Joi.string().required(),
    referenceId: Joi.string().required(),
    serialNumber: Joi.string().optional(),
});