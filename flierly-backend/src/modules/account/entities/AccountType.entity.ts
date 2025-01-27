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
  isActive: boolean;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Account type code is required.' })
  @Length(5, 25, { message: 'Account type code must be between 5 and 25 characters.' }) // Min 5, Max 25
  @Matches(/^[a-z-]+\.[a-z-]+$/, { message: 'Account type code must match the pattern /^[a-z-]+\\.[a-z-]+$/.' }) // Regex pattern
  code: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Account type name is required.' })
  @Length(5, 30, { message: 'Account type name must be between 5 and 30 characters.' }) // Min 5, Max 30
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
