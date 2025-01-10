import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import prodcutService from '../../service/product-service';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { AdjustStockRequestBody } from '../../@types/request-data.types';
import adjustStockRequestBodySchema from '../../validation-schemas/adjust-stock-request-body-schema';

const adjustStock = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const { productId, quantity, stockAdjustType }: AdjustStockRequestBody = await JoiSchemaValidator(adjustStockRequestBodySchema, req.body, { abortEarly: false }, "adjust-stock-controller");

        const result = await prodcutService.adjustStock(productId, stockAdjustType, quantity);

        // Return success response with created product
        return res.status(HttpCodes.CREATED).json(
            apiResponseBuilder({
                success: true,
                result,
                message: `Product created successfully with ID: ${result?.id}`,
                controller: 'ProductController.create',
                httpCode: HttpCodes.CREATED,
                error: null,
                req,
                res,
            }),
        );
    } catch (error) {
        return next(error);
    }
};

export default adjustStock;
