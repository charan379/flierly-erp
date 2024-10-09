import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Product } from './Product.entity';
import { UOM } from './UOM.entity';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  @IsNotEmpty({ message: 'Product must be specified' })
  product: Product;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
  
  @ManyToOne(() => UOM, { eager: true })
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
