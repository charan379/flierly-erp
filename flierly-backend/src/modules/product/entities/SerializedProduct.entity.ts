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
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @ManyToOne(() => Product, { eager: false, nullable: false })
  @JoinColumn({ name: 'product_id' })
  @IsOptional()
  product?: Product;

  @Column({ name: 'product_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ManyToOne(() => Branch, { eager: false, nullable: false })
  @JoinColumn({ name: 'branch_id' })
  @IsOptional()
  branch?: Branch;

  @Column({ name: 'branch_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  branchId: number;

  @Column({ type: 'varchar', length: 100, name: 'serial_number' })
  @IsNotEmpty()
  @Length(5, 30)
  @Matches(/^[A-Z0-9-]{5,30}$/)
  serialNumber: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true, name: "purchase_invoice_id" })
  @Length(1, 40)
  @IsOptional()
  @Matches(/^[A-Z0-9_#-]{1,40}$/)
  purchaseInvoice?: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true, name: "sales_invocie_id" })
  @Length(1, 40)
  @IsOptional()
  @Matches(/^[A-Z0-9_#-]{1,40}$/)
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
