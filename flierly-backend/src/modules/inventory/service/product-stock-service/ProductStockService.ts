import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import { InventoryStockType } from "../../constants/inventory-stock-type.enum";
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";

interface ProductStockService {
    initializeStock(productId: number, branchId: number, transactionManager?: EntityManager): Promise<ProductStock>,
    updateStock(productId: number, branchId: number, quantity: number, stockType: InventoryStockType, serialNumber?: string, transactionType?: InventoryStockTransactionType, reason?: string, referenceId?: string): Promise<ProductStock>;
    // 
    updateReserve(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.SALES_ORDER | InventoryStockTransactionType.TRANSFER_OUT | InventoryStockTransactionType.TRANSFER_IN | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void>;
    // 
    updateDefective(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.SALES_RETURN_DEFECTIVE | InventoryStockTransactionType.PURCHASE_RETURN_DEFECTIVE | InventoryStockTransactionType.MANUAL_ADJUSTMENT,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void>;
    // 
    updateOnHand(
        productId: number,
        branchId: number,
        quantity: number,
        updateType: "add" | "remove",
        transactionType: InventoryStockTransactionType.TRANSFER_IN
            | InventoryStockTransactionType.TRANSFER_OUT
            | InventoryStockTransactionType.MANUAL_ADJUSTMENT
            | InventoryStockTransactionType.PURCHASE_INVOICE
            | InventoryStockTransactionType.PURCHASE_RETURN_OK
            | InventoryStockTransactionType.SALES_RETURN_OK
            | InventoryStockTransactionType.SALES_INVOICE
            | InventoryStockTransactionType.STOCK_DISPOSAL,
        reason: string,
        referenceId: string,
        serialNumber?: string,
        transactionManager?: EntityManager
    ): Promise<void>
};

export default ProductStockService;