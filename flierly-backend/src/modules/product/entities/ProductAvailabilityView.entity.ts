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
            .addSelect(
                `(SELECT pp_1.price
                  FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_1
                  WHERE pp_1.product_id = p.id
                    AND pp_1.type = 'sale'
                    AND pp_1.effective_date = (
                        SELECT MAX(pp_2.effective_date)
                        FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_2
                        WHERE pp_2.effective_date <= CURRENT_DATE
                          AND pp_2.type = pp_1.type
                          AND pp_2.product_id = pp_1.product_id
                    )
                  ORDER BY pp_1.created_at DESC
                  LIMIT 1)`, 'sale_price')
            .from('products', 'p')
            .innerJoin('product_categories', 'pc', 'p.category_id = pc.id')
            .innerJoin('product_sub_categories', 'psc', 'p.sub_category_id = psc.id')
            .leftJoin('product_stocks', 'ps', 'p.id = ps.product_id')
            .innerJoin('inventories', 'i', 'ps.inventory_id = i.id')
            .innerJoin('branches', 'b', 'i.branch_id = b.id')
            .where('p.deleted_at IS NULL')
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
}