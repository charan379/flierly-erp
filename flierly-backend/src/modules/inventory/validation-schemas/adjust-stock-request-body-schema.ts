import Joi from "joi";
import { AdjustStockRequestBody } from "../@types/request-data.types";
import { InventoryStockType } from "../constants/inventory-stock-type.enum";

const adjustStockRequestBodySchema: Joi.ObjectSchema<AdjustStockRequestBody> = Joi.object({
    productId: Joi.number().required(),
    branchId: Joi.number().required(),
    stockType: Joi.string().valid(...Object.values(InventoryStockType)).required(),
    quantity: Joi.number().precision(10).required(),
    serialNumber: Joi.string()
        .regex(/^[A-Z0-9-]{5,30}$/)
        .optional()
        .messages({
            "string.pattern.base": "The serial number must contain only uppercase letters, numbers, and hyphens, and must be 5 to 30 characters long.",
        }),
});

export default adjustStockRequestBodySchema;