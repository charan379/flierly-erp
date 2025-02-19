interface UOM extends EntityTimeStamps {
    id: number;
    name: string;
    shortName: string;
}

interface UOMConverstion extends EntityTimeStamps {
    id: number;
    product?: Product;
    productId: number;
    fromUom?: UOM;
    fromUomId: number;
    toUom?: UOM;
    toUomId: number;
    conversionFactor: number;
    description: string;
}
