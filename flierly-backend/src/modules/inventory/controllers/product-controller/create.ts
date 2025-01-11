import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import iocContainer from '@/lib/di-ioc-container';
import ProductService from '../../service/product-service/ProductService';
import InventoryModuleBeanTypes from '../../ioc-config/bean.types';

/**
 * Creates a new product record in the database.
 *
 * @param req - Express request object containing the product data in the body
 * @param res - Express response object
 * @returns Promise resolving to Response containing the created product
 *
 * @throws ValidationError if the product data fails validation
 * @throws DatabaseError if the product cannot be saved
 */
const create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const prodcutService = iocContainer.get<ProductService>(InventoryModuleBeanTypes.ProdcutService);
        await prodcutService.newProduct(req.body);

        // Return success response with created product
        return res.status(HttpCodes.CREATED).json(
            apiResponseBuilder({
                success: true,
                result: `Product created successfully !`,
                message: `Product created successfully !`,
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

export default create;
