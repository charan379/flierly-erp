import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_latest_prices_view",
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