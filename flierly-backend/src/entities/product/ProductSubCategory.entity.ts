import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ProductCategory } from './ProductCategory.entity';

@Entity('product_sub_categories')
export class ProductSubCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
    name: string;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Product sub category code is required.' })
    @Length(5, 25, { message: 'Product sub category code must be between 5 and 25 characters.' }) // Min 5, Max 25
    @Matches(/^[a-z-]+\.[a-z-]+$/, { message: 'Product category code must match the pattern /^[a-z-]+\\.[a-z-]+$/.' }) // Regex pattern
    code: string;

    @Column({ type: 'text', nullable: true })
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    description: string;

    @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
    @JoinColumn({ name: 'category_id' })
    @IsNotEmpty({ message: 'Product Category must be specified.' })
    category: ProductCategory;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
