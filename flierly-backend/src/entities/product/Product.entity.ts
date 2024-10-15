import { IsNotEmpty, Length, IsOptional, Matches } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
  name: string;

  @Column({ type: "boolean", default: true, name: 'is_active' })
  @IsOptional()
  isActive: boolean;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'SKU must not be empty.' })
  @Length(3, 25, { message: 'SKU must be between 3 and 25 characters.' })
  @Matches(/^[A-Z0-9_-]{3,50}$/, { message: "SKU is not valid only capital letters, numbers, underscores and hyphens allowed." })
  sku: string;

  @Column({ type: "int", unique: true, nullable: true })
  @IsOptional()
  hsn: number;

  @Column({ type: "boolean", default: false, name: "is_serialized" })
  @IsOptional()
  isSerialized: boolean;

  @Column({ type: "boolean", default: false, name: "is_composite" })
  @IsOptional()
  isComposite: boolean;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(20, 250, { message: 'Description must be between 20 and 250 characters.' })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
