import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import Product from "../../entities/Product.entity";
import ProductStock from "../../entities/ProductStock.entity";
import validateEntity from "@/lib/class-validator/utils/validate-entity.util";

const createProduct = async (data: Record<string, any>): Promise<Product> => {
    try {
        return await AppDataSource.transaction(async (entityManager) => {
            const productRepository = entityManager.getRepository(Product);
            const productStockRepository = entityManager.getRepository(ProductStock);

            // Create and validate the product
            const newProduct = productRepository.create(data);
            await validateEntity(newProduct);

            // Save the product to the database
            const savedProduct = await productRepository.save(newProduct);

            // Create and validate the product stock
            const productStock = productStockRepository.create({ product: savedProduct });
            await validateEntity(productStock);

            // Save the product stock to the database
            await productStockRepository.save(productStock);

            return savedProduct;
        });
    } catch (error) {
        throw error;
    }
};

export default createProduct;
