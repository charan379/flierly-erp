import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('product_categories')
export default class ProductCategory {
    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    @IsNotEmpty()
    @Length(3, 90)
    name: string;

    @Column({ type: 'text', nullable: true })
    @Length(10, 250)
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}