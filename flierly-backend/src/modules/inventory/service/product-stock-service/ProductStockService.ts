import { EntityManager } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";

interface ProductStockService {
    initializeStock(productId: number, branchId: number, entityManager?: EntityManager): Promise<ProductStock>,
    adjustStock(productId: number, branchId: number, quantity: number, stockType: InventoryLedgerStockType): Promise<ProductStock>;

};

export default ProductStockService;