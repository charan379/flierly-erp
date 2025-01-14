import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import { InventoryStockType } from "../../constants/inventory-stock-type.enum";
import { InventoryStockTransactionType } from "../../constants/inventory-stock-transaction-type.enum";

interface ProductStockService {
    initializeStock(productId: number, branchId: number, entityManager?: EntityManager): Promise<ProductStock>,
    updateStock(productId: number, branchId: number, quantity: number, stockType: InventoryStockType, serialNumber?: string, transactionType?: InventoryStockTransactionType, reason?: string, referenceId?: string): Promise<ProductStock>;
};

export default ProductStockService;