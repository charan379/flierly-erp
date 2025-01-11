import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";

interface ProductService {
    newProduct(data: Record<string, any>): Promise<void>;
    adjustStock(productId: number, stockType: InventoryLedgerStockType, quantity: number): Promise<void>;
};

export default ProductService;