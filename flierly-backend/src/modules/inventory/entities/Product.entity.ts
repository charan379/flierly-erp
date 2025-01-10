import { IsNotEmpty, Length, IsOptional, Matches, IsNumber, IsPositive, Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import Brand from './Brand.entity';
import ProductCategory from './ProductCategory.entity';
import ProductSubCategory from './ProductSubCategory.entity';
import UOM from './UOM.entity';

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

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @IsNotEmpty({ message: 'SKU must not be empty.' })
  @Length(3, 25, { message: 'SKU must be between 3 and 25 characters.' })
  @Matches(/^[A-Z0-9_-]{3,50}$/, { message: 'SKU is not valid only capital letters, numbers, underscores and hyphens allowed.' })
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

  @ManyToOne(() => Brand, { eager: false, nullable: false })
  @JoinColumn({ name: 'brand_id' })
  @IsNotEmpty({ message: 'Brand must be specified' })
  brand: Brand;

  @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'category_id' })
  @IsNotEmpty({ message: 'Category must be specified' })
  category: ProductCategory;

  @ManyToOne(() => ProductSubCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'sub_category_id' })
  @IsNotEmpty({ message: 'SubCategory must be specified' })
  subCategory: ProductSubCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber({}, { message: 'Quantity must be a valid number' })
  @IsPositive({ message: 'Quantity must be greater than zero' })
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: "min_quantity", default: 0 })
  @IsNumber({}, { message: 'Min quantity must be a valid number' })
  @IsPositive({ message: 'Min quantity must be greater than zero' })
  @Min(0, { message: 'Min quantity cannot be negative' })
  minQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: "max_quantity", default: 0 })
  @IsNumber({}, { message: 'Max quantity must be a valid number' })
  @IsPositive({ message: 'Max quantity must be greater than zero' })
  @Min(0, { message: 'Max quantity cannot be negative' })
  maxQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: "max_purchase_price", default: 0 })
  @IsNumber({}, { message: 'Max purchase price must be a valid number' })
  @IsPositive({ message: 'Max purchase price must be greater than zero' })
  @Min(0, { message: 'Max purchase price cannot be negative' })
  maxPurchasePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: "min_sale_price", default: 0 })
  @IsNumber({}, { message: 'Min sale price must be a valid number' })
  @IsPositive({ message: 'Min sale price must be greater than zero' })
  @Min(0, { message: 'Min sale price cannot be negative' })
  minSalePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: "sale_price", default: 0 })
  @IsNumber({}, { message: 'Sale price must be a valid number' })
  @IsPositive({ message: 'Sale price must be greater than zero' })
  @Min(0, { message: 'Sale price cannot be negative' })
  salePrice: number;

  @ManyToOne(() => UOM, { eager: false, nullable: false, })
  @JoinColumn({ name: 'base_uom_id' })
  @IsNotEmpty({ message: 'Unit of Measure (UOM) must be specified' })
  baseUOM: UOM;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
