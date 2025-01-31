import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import Product from './Product.entity';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { SerializedProductStatus } from '../constants/serialized-product-status.enum';
import Branch from '@/modules/organization/entities/Branch.entity';
import { Type } from 'class-transformer';

@Entity('serialized_products')
@Unique(['product', 'serialNumber', 'branch'])
@Index(["product", "serialNumber", 'branch'], { unique: true })
export default class SerializedProduct {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt({ message: 'Serialized Product ID must be an integer.' })
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ManyToOne(() => Product, { eager: false, nullable: false })
  @JoinColumn({ name: 'product_id' })
  @IsNotEmpty({ message: 'Product must be specified' })
  product: Product;

  @Column({ name: 'product_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Product ID must be an integer.' })
  productId: number;


  @ManyToOne(() => Branch, { eager: false, nullable: false })
  @JoinColumn({ name: 'branch_id' })
  @IsNotEmpty({ message: 'Branch must be specified' })
  branch: Branch;

  @Column({ name: 'branch_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Branch ID must be an integer.' })
  branchId: number;

  @Column({ type: 'varchar', length: 100, name: 'serial_number' })
  @IsNotEmpty({ message: 'Serial number must not be empty.' })
  @Length(5, 30, { message: 'Serial number must be between 3 and 30 characters.' })
  @Matches(/^[A-Z0-9-]{5,30}$/, { message: 'Serial number is not valid only capital letters, numbers and hyphens allowed.' })
  serialNumber: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true, name: "purchase_invoice_id" })
  @Length(1, 40, { message: 'Purchase invoice id must be between 1 and 40 characters.' })
  @IsOptional()
  @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'Purchase invoice id is not valid only capital letters, numbers, underscores and hyphens allowed.' })
  purchaseInvoice?: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true, name: "sales_invocie_id" })
  @Length(1, 40, { message: 'Sales invoice id must be between 1 and 40 characters.' })
  @IsOptional()
  @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'Sales invoice id is not valid only capital letters, numbers, underscores and hyphens allowed.' })
  salesInvoice?: string;

  @Column({
    type: 'enum',
    enum: SerializedProductStatus,
  })
  @IsEnum(SerializedProductStatus)
  status: SerializedProductStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
