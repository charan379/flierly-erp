import Product from "../../entities/Product.entity";

interface ProductService {
    newProduct(data: Record<string, any>): Promise<Product>;
};

export default ProductService;