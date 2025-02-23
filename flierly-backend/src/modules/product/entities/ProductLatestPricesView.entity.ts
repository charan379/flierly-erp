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
            .addSelect(
                `(SELECT pp_1.price
                  FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_1
                  WHERE pp_1.product_id = p.id
                    AND pp_1.type = 'maximum_sale'
                    AND pp_1.effective_date = (
                        SELECT MAX(pp_2.effective_date)
                        FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_2
                        WHERE pp_2.effective_date <= CURRENT_DATE
                          AND pp_2.type = pp_1.type
                          AND pp_2.product_id = pp_1.product_id
                    )
                  ORDER BY pp_1.created_at DESC
                  LIMIT 1)`, 'maximum_sale_price')
            .addSelect(
                `(SELECT pp_1.price
                  FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_1
                  WHERE pp_1.product_id = p.id
                    AND pp_1.type = 'minimun_sale'
                    AND pp_1.effective_date = (
                        SELECT MAX(pp_2.effective_date)
                        FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_2
                        WHERE pp_2.effective_date <= CURRENT_DATE
                          AND pp_2.type = pp_1.type
                          AND pp_2.product_id = pp_1.product_id
                    )
                  ORDER BY pp_1.created_at DESC
                  LIMIT 1)`, 'minimun_sale_price')
            .addSelect(
                `(SELECT pp_1.price
                  FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_1
                  WHERE pp_1.product_id = p.id
                    AND pp_1.type = 'purchase'
                    AND pp_1.effective_date = (
                        SELECT MAX(pp_2.effective_date)
                        FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_2
                        WHERE pp_2.effective_date <= CURRENT_DATE
                          AND pp_2.type = pp_1.type
                          AND pp_2.product_id = pp_1.product_id
                    )
                  ORDER BY pp_1.created_at DESC
                  LIMIT 1)`, 'purchase_price')
            .addSelect(
                `(SELECT pp_1.price
                  FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_1
                  WHERE pp_1.product_id = p.id
                    AND pp_1.type = 'maximum_purchase'
                    AND pp_1.effective_date = (
                        SELECT MAX(pp_2.effective_date)
                        FROM ${EnvConfig.DB_SCHEMA}.product_prices pp_2
                        WHERE pp_2.effective_date <= CURRENT_DATE
                          AND pp_2.type = pp_1.type
                          AND pp_2.product_id = pp_1.product_id
                    )
                  ORDER BY pp_1.created_at DESC
                  LIMIT 1)`, 'maximum_purchase_price')
            .from('products', 'p')
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