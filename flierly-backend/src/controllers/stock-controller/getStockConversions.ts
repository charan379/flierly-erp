import HttpCodes from "@/constants/httpCodes";
import { Stock } from "@/entities/inventory/Stock.entity";
import { UOMConversion } from "@/entities/inventory/UOMConversion.entity";
import { AppDataSource } from "@/lib/app-data-source";
import FlierlyException from "@/lib/flierly.exception";
import apiResponse from "@/utils/api/responseGenerator";
import { idSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";

const getStockConversions = async (req: Request, res: Response) => {

    const stockId = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, "stock-getStockConversions");

    const stockRepository = AppDataSource.getRepository(Stock);

    const conversionRepository = AppDataSource.getRepository(UOMConversion);

    // Fetch the stock including product and uom
    const stock = await stockRepository.findOne({ where: { id: stockId }, relations: ['product', 'uom'] });

    if (!stock) {
        throw new FlierlyException("Stock not found !", HttpCodes.OK, "Stock not found");
    }

    // Find all conversions for the product and fromUom
    const conversions = await conversionRepository.find({
        where: {
            product: { id: stock.product.id },
            fromUom: { id: stock.uom.id },
        },
        relations: ['toUom'], // Fetch related toUom
    });

    // Calculate the converted quantities
    const conversionResults = conversions
        .filter(conversion => conversion.toUom.id !== stock.uom.id) // Don't convert that base uom
        .map(conversion => ({
            toUom: conversion.toUom.name, // or conversion.toUom.code
            conversionFactor: conversion.conversionFactor,
            convertedQuantity: parseFloat((stock.quantity * conversion.conversionFactor).toFixed(4)), // Rounding to 4 decimal places,
        }));

    const result = {
        defaultUom: stock.uom.name,          // Return the default UOM (stock's UOM)
        defaultQuantity: stock.quantity,      // Return the default stock quantity
        conversions: conversionResults
    };

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        controller: "stock.getStockConversions",
        error: null,
        httpCode: HttpCodes.OK,
        message: "Success",
        result,
        req, res
    }));
};

export default getStockConversions;