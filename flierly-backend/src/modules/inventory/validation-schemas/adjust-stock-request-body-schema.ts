import Joi from "joi";
import { AdjustStockRequestBody } from "../@types/request-data.types";
import { InventoryLedgerStockType } from "../constants/inventory-ledger-stock-type.enum";


const adjustStockRequestBodySchema: Joi.ObjectSchema<AdjustStockRequestBody> = Joi.object({
    productId: Joi.number().required(),
    stockAdjustType: Joi.string().valid(...Object.values(InventoryLedgerStockType)).required(),
    quantity: Joi.number().precision(10).required(),
});

export default adjustStockRequestBodySchema;