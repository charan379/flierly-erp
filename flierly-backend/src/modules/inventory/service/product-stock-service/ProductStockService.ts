import { EntityManager } from "typeorm";

interface ProductStockService {
    initializeStock(productId: number, entityManager?: EntityManager): Promise<void>,
};

export default ProductStockService;