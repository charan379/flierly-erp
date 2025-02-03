import { InventoryTransactionRefDocType } from '@/modules/inventory/constants/inventory-transaction-ref-doc-type.enum';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsEnum, IsNumber, IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';
import { ProductStockOperationType } from '../constants/product-stock-operation-type.enum';

export default class AdjustProductStockBalanceDTO {
    @IsInt({ message: 'Inventory ID must be an integer.' })
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    inventoryId: number;

    @IsInt({ message: 'Product ID must be an integer.' })
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    productId: number;

    @IsInt({ message: 'Quantity must be an integer.' })
    @IsPositive({ message: 'Quantity must be a positive number.' })
    @IsNotEmpty()
    @Type(() => Number)
    quantity: number;

    @IsEnum(ProductStockOperationType)
    operationType: ProductStockOperationType;

    @IsNumber({}, { message: 'Cost per unit must be a number.' })
    @IsPositive({ message: 'Cost per unit must be a positive number.' })
    @Type(() => Number)
    costPerUnit: number;

    @IsEnum(InventoryTransactionRefDocType)
    @IsOptional()
    referenceDocType?: InventoryTransactionRefDocType;

    @IsOptional()
    @Length(1, 40, { message: 'ReferenceDocID must be between 1 and 40 characters.' })
    @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'ReferenceID is not valid only capital letters, numbers, underscores and hyphens allowed.' })
    referenceDocId?: string; // sale invoice or purchase invoice number, etc.

    @IsOptional()
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    remarks: string;

    @Length(5, 30, { message: 'Product Serial number must be between 3 and 30 characters.' })
    @IsOptional()
    @Matches(/^[A-Z0-9-]{5,30}$/, { message: 'Product Serial number is not valid only capital letters, numbers and hyphens allowed.' })
    productSerialNumber: string;
}