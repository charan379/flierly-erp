import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';
import Product from '@/modules/product/entities/Product.entity';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('tax_rates')
export default class TaxRate {
    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name: string; // Example: GST, VAT, Sales Tax

    @Column({ name: 'rate', type: 'decimal', precision: 4, scale: 2 })
    @Type(() => Number)
    @IsNumber()
    rate: number; // Example: 18.00 for 18%

    @Column({ name: 'is_inclusive', type: 'boolean', default: false })
    @IsBoolean()
    @Type(() => Boolean)
    isInclusive: boolean; // Indicates if the tax is included in the price

    @ManyToMany(() => Product, (product) => product.taxRates)
    products: Product[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
