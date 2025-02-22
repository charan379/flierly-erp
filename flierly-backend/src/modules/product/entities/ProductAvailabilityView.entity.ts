import { EnvConfig } from '@/config/env';
import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_availability_view",
    schema: EnvConfig.DB_SCHEMA,
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('p.id', 'product_id')
            .addSelect('p.name', 'product_name')
            .addSelect('p.type', 'product_type')
            .addSelect('pc.id', 'category_id')
            .addSelect('pc.name', 'category_name')
            .addSelect('psc.id', 'subcategory_id')
            .addSelect('psc.name', 'subcategory_name')
            .addSelect('ps.id', 'stock_id')
            .addSelect('ps.balance', 'stock_balance')
            .addSelect('i.id', 'inventory_id')
            .addSelect('i.inventory_type', 'inventory_type')
            .addSelect('b.id', 'branch_id')
            .addSelect('b.name', 'branch_name')
            .addSelect('MAX(CASE WHEN pp.type = \'sale\' THEN pp.price END)', 'sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'maximum_sale\' THEN pp.price END)', 'maximum_sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'minimun_sale\' THEN pp.price END)', 'minimun_sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'purchase\' THEN pp.price END)', 'purchase_price')
            .addSelect('MAX(CASE WHEN pp.type = \'maximum_purchase\' THEN pp.price END)', 'maximum_purchase_price')
            .from('products', 'p')
            .innerJoin('product_categories', 'pc', 'p.category_id = pc.id')
            .innerJoin('product_sub_categories', 'psc', 'p.sub_category_id = psc.id')
            .leftJoin('product_stocks', 'ps', 'p.id = ps.product_id')
            .innerJoin('inventories', 'i', 'ps.inventory_id = i.id')
            .innerJoin('branches', 'b', 'i.branch_id = b.id')
            // Subquery for latest prices
            .leftJoin(
                (subQuery) => {
                    return subQuery
                        .select('pp.product_id', 'product_id')
                        .addSelect('pp.type', 'type')
                        .addSelect('MAX(pp.effective_date)', 'latest_effective_date')
                        .addSelect('MAX(pp.created_at)', 'latest_created_at')
                        .from('product_prices', 'pp')
                        .where('pp.effective_date <= CURRENT_DATE')
                        .groupBy('pp.product_id, pp.type');
                },
                'latest_prices',
                'latest_prices.product_id = p.id'
            )
            // Joining product_prices with subquery results
            .leftJoin(
                'product_prices',
                'pp',
                'pp.product_id = latest_prices.product_id AND pp.type = latest_prices.type AND pp.effective_date = latest_prices.latest_effective_date AND pp.created_at = latest_prices.latest_created_at'
            )
            .groupBy('p.id, p.name, p.type, pc.id, pc.name, psc.id, psc.name, ps.id, ps.balance, i.id, i.inventory_type, b.id, b.name')
})
export default class ProductAvailabilityView {

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'product_name' })
    productName: string;

    @Column({ name: 'product_type' })
    productType: string;

    @Column({ name: 'category_id' })
    categoryId: number;

    @Column({ name: 'category_name' })
    categoryName: string;

    @Column({ name: 'subcategory_id' })
    subcategoryId: number;

    @Column({ name: 'subcategory_name' })
    subcategoryName: string;

    @Column({ name: 'stock_id' })
    stockId: number;

    @Column({ name: 'stock_balance', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    stockBalance: number;

    @Column({ name: 'inventory_id' })
    inventoryId: number;

    @Column({ name: 'inventory_type' })
    inventoryType: string;

    @Column({ name: 'branch_id' })
    branchId: number;

    @Column({ name: 'branch_name' })
    branchName: string;

    @Column({ name: 'sale_price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    salePrice: number;

    @Column({ name: 'maximum_sale_price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    maximumSalePrice: number;

    @Column({ name: 'minimun_sale_price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    minimunSalePrice: number;

    @Column({ name: 'purchase_price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    purchasePrice: number;

    @Column({ name: 'maximum_purchase_price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    maximumPurchasePrice: number;
}