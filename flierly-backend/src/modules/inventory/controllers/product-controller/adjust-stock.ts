import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import { AdjustStockRequestBody } from '../../@types/request-data.types';
import adjustStockRequestBodySchema from '../../validation-schemas/adjust-stock-request-body-schema';
import iocContainer from '@/lib/di-ioc-container';
import ProductService from '../../service/product-service/ProductService';
import InventoryModuleBeanTypes from '../../ioc-config/bean.types';

const adjustStock = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const { productId, quantity, stockAdjustType }: AdjustStockRequestBody = await JoiSchemaValidator(adjustStockRequestBodySchema, req.body, { abortEarly: false }, "adjust-stock-controller");

        const prodcutService = iocContainer.get<ProductService>(InventoryModuleBeanTypes.ProdcutService);

        prodcutService.adjustStock(productId, stockAdjustType, quantity);

        // Return success response with created product
        return res.status(HttpCodes.CREATED).json(
            apiResponseBuilder({
                success: true,
                result: `Product Stock adjusted successfully !`,
                message: `Product Stock adjusted successfully !`,
                controller: 'ProductController.adjustStock',
                httpCode: HttpCodes.OK,
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
