import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm';

@Entity('uoms')
export default class UOM {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false, name: "short_name" })
  @IsNotEmpty()
  @Length(1, 10)
  @Matches(/^[a-zA-Z0-9]{1,10}$/)
  shortName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
