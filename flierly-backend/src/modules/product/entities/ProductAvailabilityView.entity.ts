import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_availability_view",
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
            .addSelect('MAX(CASE WHEN pp.type::text = \'sale\' THEN pp.price END)', 'sale_price')
            .addSelect('MAX(CASE WHEN pp.type::text = \'maximum_sale\' THEN pp.price END)', 'maximum_sale_price')
            .addSelect('MAX(CASE WHEN pp.type::text = \'minimun_sale\' THEN pp.price END)', 'minimun_sale_price')
            .addSelect('MAX(CASE WHEN pp.type::text = \'purchase\' THEN pp.price END)', 'purchase_price')
            .addSelect('MAX(CASE WHEN pp.type::text = \'maximum_purchase\' THEN pp.price END)', 'maximum_purchase_price')
            .from('products', 'p')
            .innerJoin('product_categories', 'pc', 'p.category_id = pc.id')
            .innerJoin('product_sub_categories', 'psc', 'p.sub_category_id = psc.id')
            .leftJoin('product_stocks', 'ps', 'p.id = ps.product_id')
            .innerJoin('inventories', 'i', 'ps.inventory_id = i.id')
            .innerJoin('branches', 'b', 'i.branch_id = b.id')
            .leftJoin('product_prices', 'pp', 'p.id = pp.product_id AND pp.effective_date <= CURRENT_DATE AND (pp.effective_date, pp.created_at) = (SELECT pp2.effective_date, MAX(pp2.created_at) FROM product_prices pp2 WHERE pp2.product_id = pp.product_id AND pp2.type::text = pp.type::text AND pp2.effective_date <= CURRENT_DATE GROUP BY pp2.effective_date)')
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