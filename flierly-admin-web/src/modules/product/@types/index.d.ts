interface Brand extends EntityTimeStamps {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
};

interface ProductCategory extends EntityTimeStamps {
    id: number;
    name: string;
    description: string;
};

interface ProductSubCategory extends EntityTimeStamps {
    id: number;
    name: string;
    description: string;
    category?: ProductCategory;
    categoryId: number;
};

interface Product extends EntityTimeStamps {
    id: number;
    name: string;
    type: "tangible" | "intangible";
    isActive: boolean;
    sku: string;
    hsn?: number;
    isSerialized?: boolean;
    isComposite: boolean;
    description: string;
    price: number;
    category?: ProductCategory;
    categoryId: number;
    subCategory?: ProductSubCategory;
    subCategoryId: number;
    baseUOM?: UOM;
    baseUOMId: number;
    brand?: Brand;
    brandId: number;
    taxRates?: TaxRate[];
};

interface ProductStock extends EntityTimeStamps {
    id: number;
    productId: number;
    product?: Product;
    inventoryId: number;
    inventory?: Inventory;
    balance: number;
}

type ProductPriceType = "purchase" | "sale" | "minimun_sale" | "maximum_sale" | "maximum_purchase";

interface ProductLatestPricesView {
    productId: number;
    productName: string;
    sku: string;
    hsn: number;
    isSerialized: boolean;
    isComposite: boolean;
    salePrice: number | null;
    maximumSalePrice: number | null;
    minimunSalePrice: number | null;
    purchasePrice: number | null;
    maximumPurchasePrice: number | null;
};

interface ProductAvailabilityView {
    productId: number;
    productName: string;
    productType: string;
    categoryId: number;
    categoryName: string;
    subcategoryId: number;
    subcategoryName: string;
    stockId: number;
    stockBalance: number;
    inventoryId: number;
    inventoryType: string;
    branchId: number;
    branchName: string;
    salePrice: number | null;
};

interface ProductPrice extends EntityTimeStamps {
    id: number;
    type: ProductPriceType;
    productId: number;
    product?: Product;
    price: number;
    effectiveDate: Date;
    updatedAt: never;
};

type ProductComponent = {
    compositeProductId: number;
    componentProductId: number;
    compositeProduct: Product;
    componentProduct: Product;
} & EntityTimeStamps;

type SerializedProduct = {
    id: number;
    product: Product;
    serialNumber: string;
    status: 'AVAILABLE' | 'SOLD' | 'RETURNED'
} & EntityTimeStamps;


type TagMetadata = {
    id: number;
    entity: string;
    name: string;
    datatype: "string" | "number" | "boolean" | "enum"; // Enum values replaced with actual strings
    options?: { label: string; value: string; color: string }[]; // For ENUM types
    description?: string; // Optional field
} & EntityTimeStamps;
