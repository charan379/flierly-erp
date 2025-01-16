import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { PrimaryGeneratedColumn, Column, ViewEntity, DataSource } from 'typeorm';

@ViewEntity({
    name: "product_latest_prices_view",
    expression: (dataSource: DataSource) => 
        dataSource
            .createQueryBuilder()
            .select('p.id', 'id')
            .addSelect('p.name', 'product_name')
            .addSelect('p.sku', 'sku')
            .addSelect('p.hsn', 'hsn')
            .addSelect('p.is_serialized', 'is_serialized')
            .addSelect('p.is_composite', 'is_composite')
            .addSelect('pp.type', 'price_type')
            .addSelect('pp.price', 'price')
            .addSelect('pp.effective_date', 'effective_date')
            .from('products', 'p')
            // Subquery for latest prices
            .innerJoin(
                (subQuery) => {
                    return subQuery
                        .select('pp.product_id', 'product_id')
                        .addSelect('pp.type', 'type')
                        .addSelect('MAX(pp.effective_date)', 'latest_effective_date')
                        .from('product_prices', 'pp')
                        .groupBy('pp.product_id, pp.type');
                },
                'latest_prices', 
                'latest_prices.product_id = p.id'
            )
            // Joining product_prices with subquery results
            .innerJoin(
                'product_prices',
                'pp',
                'pp.product_id = latest_prices.product_id AND pp.type = latest_prices.type AND pp.effective_date = latest_prices.latest_effective_date'
            )
            .where('p.is_active = true'), // Optional filter for active products
})
export default class ProductLatestPricesViewEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({ name: 'price_type' })
    priceType: string;

    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, transformer: DecimalTransformer })
    price: number;

    @Column({ name: 'effective_date', type: 'timestamptz' })
    effectiveDate: Date;
}