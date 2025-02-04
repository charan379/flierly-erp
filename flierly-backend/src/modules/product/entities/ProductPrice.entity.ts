import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
    Index,
} from 'typeorm';
import { ProductPriceType } from '../constants/product-price-type.enum';
import Product from './Product.entity';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';
import { Type } from 'class-transformer';

@Entity('product_prices')
@Index(["type", "product", "effectiveDate"])
export default class ProductPrice {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({
        type: 'enum',
        enum: ProductPriceType,
        nullable: false,
    })
    @IsEnum(ProductPriceType)
    type: ProductPriceType;

    @ManyToOne(() => Product, { eager: false, nullable: false })
    @JoinColumn({ name: 'product_id' })
    @IsOptional()
    @Type(() => Product)
    product?: Product;

    @Column({ name: 'product_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    price: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: "effective_date" })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    effectiveDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
