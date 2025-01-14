import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Brand from './Brand.entity';
import ProductCategory from './ProductCategory.entity';
import ProductSubCategory from './ProductSubCategory.entity';
import UOM from './UOM.entity';
import TaxRate from '@/modules/taxation/entities/Tax.entity';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
  name: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsOptional()
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @IsNotEmpty({ message: 'SKU must not be empty.' })
  @Length(3, 30, { message: 'SKU must be between 3 and 25 characters.' })
  @Matches(/^[A-Z0-9_-]{3,30}$/, { message: 'SKU is not valid only capital letters, numbers, underscores and hyphens allowed.' })
  sku: string;

  @Column({ type: 'int', unique: false, nullable: true })
  @IsOptional()
  hsn: number;

  @Column({ type: 'boolean', default: false, name: 'is_serialized' })
  @IsOptional()
  isSerialized: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_composite' })
  @IsOptional()
  isComposite: boolean;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(20, 250, { message: 'Description must be between 20 and 250 characters.' })
  description: string;

  @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'category_id' })
  @IsNotEmpty({ message: 'Category must be specified' })
  category: ProductCategory;

  @ManyToOne(() => ProductSubCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'sub_category_id' })
  @IsNotEmpty({ message: 'SubCategory must be specified' })
  subCategory: ProductSubCategory;

  @ManyToOne(() => UOM, { eager: false, nullable: false, })
  @JoinColumn({ name: 'base_uom_id' })
  @IsNotEmpty({ message: 'Unit of Measure (UOM) must be specified' })
  baseUOM: UOM;

  @ManyToOne(() => Brand, { eager: false, nullable: false })
  @JoinColumn({ name: 'brand_id' })
  @IsNotEmpty({ message: 'Brand must be specified' })
  brand: Brand;

  @ManyToMany(() => TaxRate, (taxRate) => taxRate.products)
  @JoinTable({
    name: 'product_tax_rates',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tax_rate_id',
      referencedColumnName: 'id',
    },
  })
  taxeRates: TaxRate[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
