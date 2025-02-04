import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('brands')
export default class Brand {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty()
  @Length(3, 90)
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @Length(20, 250)
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
