import { inject, injectable } from "inversify";
import ProductService from "./ProductService";
import { Repository } from "typeorm";
import Product from "../../entities/Product.entity";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import validateClassInstance from "@/lib/class-validator/utils/validate-entity.util";

@injectable()
class ProductServiceImpl implements ProductService {

    private readonly productRepository: Repository<Product>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
    ) {
        this.productRepository = this.databaseService.getRepository(Product);
    }

    async newProduct(data: Record<string, any>) {
        try {
            // Use queryRunner.manager for transactional operations
            const product = this.productRepository.create(data);
            // Validate product instance
            await validateClassInstance(product);
            return await this.productRepository.save(product);
        } catch (error) {
            throw error;
        }
    }
};

export default ProductServiceImpl;