import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import Product from './Product.entity';
import UOM from './UOM.entity';

@Entity('uom_conversions')
@Unique(['product', 'fromUom', 'toUom'])
export class UOMConversion {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  @IsNotEmpty({ message: 'Product must not be empty.' })
  product: Product;

  @ManyToOne(() => UOM, { eager: false })
  @JoinColumn({ name: 'from_uom_id' })
  @IsNotEmpty({ message: 'From UOM must not be empty.' })
  fromUom: UOM;

  @ManyToOne(() => UOM, { eager: false })
  @JoinColumn({ name: 'to_uom_id' })
  @IsNotEmpty({ message: 'To UOM must not be empty.' })
  toUom: UOM;

  @Column({ type: 'decimal', precision: 10, scale: 4, name: 'conversion_factor' })
  @IsNumber({ maxDecimalPlaces: 4 }, { message: 'Conversion factor must be a valid number with upto 4 decimal places.' })
  @IsPositive({ message: 'Conversion factor must be greater than zero.' })
  conversionFactor: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
