import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { ProductPriceType } from '../constants/product-price-type.enum';
import Product from './Product.entity';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@Entity('product_prices')
export default class ProductPrice {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({
        type: 'enum',
        enum: ProductPriceType,
        default: ProductPriceType.SALE
    })
    type: ProductPriceType;

    @ManyToOne(() => Product, { eager: false, nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsPositive({ message: 'Price must be greater than zero' })
    @Min(0, { message: 'Price cannot be negative' })
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: "effective_date" })
    @IsOptional()
    effectiveDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
