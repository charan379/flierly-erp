import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, Unique } from 'typeorm';
import Product from '@/modules/product/entities/Product.entity';
import UOM from './UOM.entity';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

@Entity('stock')
@Unique(['product', 'uom'])
export default class Stock {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  @IsNotEmpty({ message: 'Product must be specified' })
  product: Product;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => UOM, { eager: false })
  @JoinColumn({ name: 'uom_id' })
  @IsNotEmpty({ message: 'Unit of Measure (UOM) must be specified' })
  uom: UOM;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({}, { message: 'Quantity must be a valid number' })
  @IsPositive({ message: 'Quantity must be greater than zero' })
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
