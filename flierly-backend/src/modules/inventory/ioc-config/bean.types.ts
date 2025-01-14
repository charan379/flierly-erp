
const InventoryModuleBeanTypes = {
    InventoryLedgerService: Symbol.for("inventoryLedgerService"),
    // Product
    ProductService: Symbol.for("productService"),
    ProductController: Symbol.for("productController"),
    // ProductStock
    ProductStockService: Symbol.for("productStockService"),
    ProductStockController: Symbol.for('productStockController'),
    // SerializedProduct
    SerializedProductService: Symbol.for("serializedProductService"),
};

export default InventoryModuleBeanTypes;