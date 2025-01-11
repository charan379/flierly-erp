import { inject, injectable } from "inversify";
import ProductStockService from "./ProductStockService";
import { EntityManager, Repository } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";

@injectable()
class ProductStockServiceImpl implements ProductStockService {

    private readonly productStockRepository: Repository<ProductStock>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
    ) {
        this.productStockRepository = this.databaseService.getRepository(ProductStock);
    }

    async initializeStock(productId: number, entityManager?: EntityManager): Promise<void> {
        try {
            const productStock = this.productStockRepository.create({
                product: { id: productId },
                available: 0,
                defective: 0,
                onHand: 0,
                onOrder: 0,
                reserved: 0,
            });

            await validateEntityInstance(productStock);
            if (entityManager) {
                entityManager.save(ProductStock, productStock);
            } else {
                await this.productStockRepository.save(productStock);
            };

        } catch (error) {
            throw error;
        }
    }
};

export default ProductStockServiceImpl;