import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import ProductCategory from './ProductCategory.entity';
import { Type } from 'class-transformer';

@Entity('product_sub_categories')
export default class ProductSubCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @IsInt({ message: 'Product Sub Category ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
    name: string;

    @Column({ type: 'text', nullable: true })
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    description: string;

    @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
    @JoinColumn({ name: 'category_id' })
    @IsNotEmpty({ message: 'Parent Category must be specified.' })
    category: ProductCategory;

    @Column({ name: 'category_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Parent Category ID must be an integer.' })
    categoryId: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
