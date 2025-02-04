import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('account_types')
export default class AccountType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Type(() => Boolean)
  @IsBoolean()
  isActive: boolean = true;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(5, 30)
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
