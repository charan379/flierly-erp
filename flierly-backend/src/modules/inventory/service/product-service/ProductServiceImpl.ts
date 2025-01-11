import { inject, injectable } from "inversify";
import ProductService from "./ProductService";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import { Repository } from "typeorm";
import Product from "../../entities/Product.entity";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import InventoryModuleBeanTypes from "../../ioc-config/bean.types";
import ProductStockService from "../product-stock-service/ProductStockService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";

@injectable()
class ProductServiceImpl implements ProductService {

    private readonly productRepository: Repository<Product>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(InventoryModuleBeanTypes.ProductStockService) private readonly productStockService: ProductStockService,
    ) {
        this.productRepository = this.databaseService.getRepository(Product);
    }

    async newProduct(data: Record<string, any>) {
        const queryRunner = this.databaseService.getQueryRunner();
        await queryRunner.startTransaction();

        try {
            // Use queryRunner.manager for transactional operations
            const product = queryRunner.manager.create(Product, data);

            // Validate product instance
            await validateEntityInstance(product);

            // Save the product and initialize stock
            const newProduct = await queryRunner.manager.save(product);
            await this.productStockService.initializeStock(newProduct.id, queryRunner.manager);
            // Commit transaction
            await queryRunner.commitTransaction();
        } catch (error) {
            // Rollback transaction on error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // QueryRunner is released
            await queryRunner.release();
        }
    }

    adjustStock(productId: number, stockType: InventoryLedgerStockType, quantity: number): Promise<void> {
        throw new Error("Method not implemented");
    }
};

export default ProductServiceImpl;