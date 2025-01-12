
interface ProductService {
    newProduct(data: Record<string, any>): Promise<void>;
};

export default ProductService;