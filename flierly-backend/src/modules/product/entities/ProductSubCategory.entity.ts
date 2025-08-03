import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';
import ProductCategory from './ProductCategory.entity';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('product_sub_categories')
export default class ProductSubCategory {
    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    @IsNotEmpty()
    @Length(3, 90)
    name: string;

    @Column({ type: 'text', nullable: true })
    @Length(10, 250)
    description: string;

    @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
    @JoinColumn({ name: 'category_id' })
    @IsOptional()
    category?: ProductCategory;

    @Column({ name: 'category_id', type: 'bigint', transformer: NumericTransformer })
    @Index()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    categoryId: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
