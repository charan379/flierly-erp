type Brand = {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
} & EntityTimeStamps;

type Product = {
    id: number;
    name: string;
    isActive: boolean;
    sku: string;
    hsn: number;
    isSerialized: boolean;
    isComposite: boolean;
    description: string;
    price: number;
    brand?: Brand | number;
    category?: ProductCategory | number;
    subCategory?: ProductSubCategory | number;
} & EntityTimeStamps;

type ProductCategory = {
    id: number;
    name: string;
    isActive: boolean;
    code: string;
    description: string;
} & EntityTimeStamps;

type ProductSubCategory = {
    id: number;
    name: string;
    isActive: boolean;
    code: string;
    description: string;
    category: ProductCategory | number;
} & EntityTimeStamps;

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
