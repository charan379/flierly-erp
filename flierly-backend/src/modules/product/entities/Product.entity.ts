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
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty()
  @Length(3, 90)
  name: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.TANGIBLE, name: "type" })
  @IsEnum(ProductType)
  @IsOptional()
  type: ProductType = ProductType.TANGIBLE;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @IsNotEmpty()
  @Length(3, 30)
  @Matches(/^[A-Z0-9_-]{3,30}$/)
  sku: string;

  @Column({ type: 'int', unique: false, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hsn?: number;

  @Column({ type: 'boolean', default: false, name: 'is_serialized' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isSerialized: boolean = false;

  @Column({ type: 'boolean', default: false, name: 'is_composite' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isComposite: boolean = false;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(20, 250)
  description: string;

  @ManyToOne(() => ProductCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'category_id' })
  @Type(() => ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @Column({ name: 'category_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ManyToOne(() => ProductSubCategory, { eager: false, nullable: false })
  @JoinColumn({ name: 'sub_category_id' })
  @Type(() => ProductSubCategory)
  @IsOptional()
  subCategory?: ProductSubCategory;

  @Column({ name: 'sub_category_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  subCategoryId: number;

  @ManyToOne(() => UOM, { eager: false, nullable: false, })
  @JoinColumn({ name: 'base_uom_id' })
  @Type(() => UOM)
  @IsOptional()
  baseUOM?: UOM;

  @Column({ name: 'base_uom_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  baseUOMId: number;

  @ManyToOne(() => Brand, { eager: false, nullable: false })
  @JoinColumn({ name: 'brand_id' })
  @Type(() => Brand)
  @IsOptional()
  brand?: Brand;

  @Column({ name: 'brand_id', type: 'bigint', default: 1 })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
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
  taxeRates?: TaxRate[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
