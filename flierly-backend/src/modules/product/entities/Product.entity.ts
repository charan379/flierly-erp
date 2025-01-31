import { IsNotEmpty, Length, IsOptional, Matches, IsEnum, IsInt, IsBoolean, isNumber, IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm';
import ProductCategory from './ProductCategory.entity';
import ProductSubCategory from './ProductSubCategory.entity';
import TaxRate from '@/modules/taxation/entities/Tax.entity';
import { Type } from 'class-transformer';
import { ProductType } from '../constants/product-type.enum';
import Brand from '@/modules/brand/entities/Brand.entity';
import UOM from '@/modules/uom/entities/UOM.entity';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsInt({ message: 'Product ID must be an integer.' })
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
  name: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.TANGIBLE, name: "type" })
  @IsEnum(ProductType, { message: 'Product type must be either tangible or intangible.' })
  @IsOptional()
  type: ProductType;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @IsNotEmpty({ message: 'SKU must not be empty.' })
  @Length(3, 30, { message: 'SKU must be between 3 and 25 characters.' })
  @Matches(/^[A-Z0-9_-]{3,30}$/, { message: 'SKU is not valid only capital letters, numbers, underscores and hyphens allowed.' })
  sku: string;

  @Column({ type: 'int', unique: false, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hsn: number;

  @Column({ type: 'boolean', default: false, name: 'is_serialized' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isSerialized: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_composite' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isComposite: boolean;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(20, 250, { message: 'Description must be between 20 and 250 characters.' })
  description: string;

  @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'category_id' })
  @IsNotEmpty({ message: 'Category must be specified' })
  @Type(() => ProductCategory)
  @IsOptional()
  category: ProductCategory;

  @Column({ name: 'category_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Category ID must be an integer.' })
  categoryId: number;

  @ManyToOne(() => ProductSubCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'sub_category_id' })
  @IsNotEmpty({ message: 'SubCategory must be specified' })
  @Type(() => ProductSubCategory)
  @IsOptional()
  subCategory: ProductSubCategory;

  @Column({ name: 'sub_category_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Sub Category ID must be an integer.' })
  subCategoryId: number;

  @ManyToOne(() => UOM, { eager: false, nullable: false, })
  @JoinColumn({ name: 'base_uom_id' })
  @IsNotEmpty({ message: 'Unit of Measure (UOM) must be specified' })
  @Type(() => UOM)
  @IsOptional()
  baseUOM: UOM;

  @Column({ name: 'base_uom_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Base UOM ID must be an integer.' })
  baseUOMId: number;

  @ManyToOne(() => Brand, { eager: false, nullable: false })
  @JoinColumn({ name: 'brand_id' })
  @IsNotEmpty({ message: 'Brand must be specified' })
  @Type(() => Brand)
  @IsOptional()
  brand: Brand;

  @Column({ name: 'brand_id', type: 'bigint', default: 1 })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Brand ID must be an integer.' })
  brandId: number;

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
