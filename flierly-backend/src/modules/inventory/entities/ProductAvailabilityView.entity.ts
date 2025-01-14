import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { PrimaryGeneratedColumn, Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_availability_view",
    expression: (dataSource: DataSource) => dataSource.createQueryBuilder()
        .select('p.id', 'id')
        .addSelect('p.name', 'product_name')
        .addSelect('p.type', 'product_type')
        .addSelect('pc.id', 'category_id')
        .addSelect('pc.name', 'category_name')
        .addSelect('psc.id', 'sub_category_id')
        .addSelect('psc.name', 'sub_category_name')
        .addSelect('p.sku', 'sku')
        .addSelect('p.hsn', 'hsn')
        .addSelect('p.is_serialized', 'is_serialized')
        .addSelect('p.is_composite', 'is_composite')
        .addSelect('p.description', 'description')
        .addSelect('brand.id', 'brand_id')
        .addSelect('brand.name', 'brand_name')
        .addSelect('uom.id', 'uom_id')
        .addSelect('uom.name', 'uom_name')
        .addSelect('uom.short_name', 'uom_short_name')
        .addSelect('b.id', 'branch_id')
        .addSelect('b.name', 'branch_name')
        .addSelect('ps.id', 'stock_id')
        .addSelect('ps.on_hand', 'on_hand')
        .addSelect('ps.on_hand - ps.reserved - ps.defective', 'available')
        .addSelect('ps.on_order', 'on_order')
        .addSelect('ps.reserved', 'reserved')
        .addSelect('ps.defective', 'defective')
        .addSelect('pp.price', 'selling_price')
        .from('product_stocks', 'ps')
        .innerJoin('products', 'p', 'ps.product_id = p.id AND p.is_active = true')
        .innerJoin('branches', 'b', 'ps.branch_id = b.id')
        .innerJoin(subQuery => {
            return subQuery
                .select('product_id')
                .addSelect('type')
                .addSelect('MAX(effective_date)', 'latest_effective_date')
                .from('product_prices', 'pp')
                .where("pp.type = 'sale'")
                .groupBy('product_id, type');
        }, 'latest_prices', "latest_prices.product_id = ps.product_id AND latest_prices.type = 'sale'")
        .innerJoin('product_prices', 'pp', 'pp.product_id = ps.product_id AND pp.type = latest_prices.type AND pp.effective_date = latest_prices.latest_effective_date')
        .innerJoin('product_categories', 'pc', 'p.category_id = pc.id')
        .innerJoin('product_sub_categories', 'psc', 'p.sub_category_id = psc.id')
        .innerJoin('uoms', 'uom', 'p.base_uom_id = uom.id')
        .innerJoin('brands', 'brand', 'p.brand_id = brand.id')
})
export default class ProductAvailabilityViewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_type' })
    productType: string;

    @Column({ name: 'product_name' })
    productName: string;

    @Column({ name: 'category_id' })
    categoryId: number;

    @Column({ name: 'category_name' })
    categoryName: string;

    @Column({ name: 'sub_category_id' })
    subCategoryId: number;

    @Column({ name: 'sub_category_name' })
    subCategoryName: string;

    @Column({ name: 'sku' })
    sku: string;

    @Column({ name: 'hsn' })
    hsn: number;

    @Column({ name: 'is_serialized' })
    isSerialized: boolean;

    @Column({ name: 'is_composite' })
    isComposite: boolean;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'brand_id' })
    brandId: number;

    @Column({ name: 'brand_name' })
    brandName: string;

    @Column({ name: 'uom_id' })
    uomId: number;

    @Column({ name: 'uom_name' })
    uomName: string;

    @Column({ name: 'uom_short_name' })
    uomShortName: string;

    @Column({ name: 'branch_id' })
    branchId: number;

    @Column({ name: 'branch_name' })
    branchName: string;

    @Column({ name: 'stock_id' })
    stockId: number;

    @Column({ name: 'on_hand', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    onHand: number;

    @Column({ name: 'available', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    available: number;

    @Column({ name: 'on_order', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    onOrder: number;

    @Column({ name: 'reserved', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    reserved: number;

    @Column({ name: 'defective', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    defective: number;

    @Column({ name: 'selling_price' })
    sellingPrice: number;
}