import { EnvConfig } from '@/config/env';
import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_latest_prices_view",
    schema: EnvConfig.DB_SCHEMA,
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('p.id', 'product_id')
            .addSelect('p.name', 'product_name')
            .addSelect('p.sku', 'sku')
            .addSelect('p.hsn', 'hsn')
            .addSelect('p.is_serialized', 'is_serialized')
            .addSelect('p.is_composite', 'is_composite')
            .addSelect('MAX(CASE WHEN pp.type = \'sale\' THEN pp.price END)', 'sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'maximum_sale\' THEN pp.price END)', 'maximum_sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'minimun_sale\' THEN pp.price END)', 'minimun_sale_price')
            .addSelect('MAX(CASE WHEN pp.type = \'purchase\' THEN pp.price END)', 'purchase_price')
            .addSelect('MAX(CASE WHEN pp.type = \'maximum_purchase\' THEN pp.price END)', 'maximum_purchase_price')
            .from('products', 'p')
            // Subquery for latest prices
            .leftJoin(
                (subQuery) => {
                    return subQuery
                        .select('pp_1.product_id', 'product_id')
                        .addSelect('pp_1.type', 'type')
                        .addSelect('pp_1.effective_date', 'effective_date')
                        .addSelect('pp_1.created_at', 'created_at')
                        .from('product_prices', 'pp_1')
                        .where('(pp_1.product_id, pp_1.type, pp_1.effective_date, pp_1.created_at) IN (' +
                            'SELECT pp_2.product_id, pp_2.type, MAX(pp_2.effective_date) AS effective_date, MAX(pp_2.created_at) AS created_at ' +
                            'FROM product_prices pp_2 ' +
                            'WHERE pp_2.effective_date = (' +
                                'SELECT MAX(effective_date) ' +
                                'FROM product_prices ' +
                                'WHERE effective_date <= CURRENT_DATE' +
                            ') ' +
                            'GROUP BY pp_2.product_id, pp_2.type' +
                        ')')
                },
                'pp',
                'pp.product_id = p.id'
            )
            .where('p.deleted_at IS NULL')
            .groupBy('p.id')
})
export default class ProductLatestPricesView {

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'product_name' })
    productName: string;

    @Column({ name: 'sku' })
    sku: string;

    @Column({ name: 'hsn' })
    hsn: number;

    @Column({ name: 'is_serialized' })
    isSerialized: boolean;

    @Column({ name: 'is_composite' })
    isComposite: boolean;

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
};