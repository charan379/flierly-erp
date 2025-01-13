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
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { DecimalTransformer } from '@/lib/database/typeorm/utils/DecimalTransformer';

@Entity('product_prices')
@Index(["type", "product", "effectiveDate"])
export default class ProductPrice {
    @PrimaryGeneratedColumn({ type: 'bigint' })
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
    @IsNotEmpty({ message: 'Product must be specified' })
    product: Product;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsPositive({ message: 'Price must be greater than zero' })
    @Min(0, { message: 'Price cannot be negative' })
    price: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: "effective_date" })
    @IsOptional()
    effectiveDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
