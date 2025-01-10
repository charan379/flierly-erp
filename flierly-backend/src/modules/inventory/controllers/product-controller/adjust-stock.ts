import HttpCodes from '@/constants/http-codes.enum';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { NextFunction, Request, Response } from 'express';
import prodcutService from '../../service/product-service';
import { InventoryLedgerStockType } from '../../constants/inventory-ledger-stock-type.enum';

const adjustStock = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {

        const result = await prodcutService.adjustStock(4, InventoryLedgerStockType.DEFECTIVE, 3.5);

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
