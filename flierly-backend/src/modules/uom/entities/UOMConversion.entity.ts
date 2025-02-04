import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, Index } from 'typeorm';
import UOM from './UOM.entity';
import { Type } from 'class-transformer';
import Product from '@/modules/product/entities/Product.entity';

@Entity('uom_conversions')
@Unique(['product', 'fromUom', 'toUom'])
export class UOMConversion {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsOptional()
  id: number;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  @IsOptional()
  product?: Product;

  @Column({ name: 'product_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ManyToOne(() => UOM, { eager: false })
  @JoinColumn({ name: 'from_uom_id' })
  @IsOptional()
  fromUom?: UOM;

  @Column({ name: 'from_uom_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  fromUomId: number;

  @ManyToOne(() => UOM, { eager: false })
  @JoinColumn({ name: 'to_uom_id' })
  @IsOptional()
  toUom?: UOM;

  @Column({ name: 'to_uom_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  toUomId: number;

  @Column({ type: 'decimal', precision: 10, scale: 4, name: 'conversion_factor' })
  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @Type(() => Number)
  conversionFactor: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(10, 250)
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
