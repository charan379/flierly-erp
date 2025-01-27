import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import AccountType from './AccountType.entity';
import { Type } from 'class-transformer';

@Entity('account_subtypes')
export default class AccountSubtype {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Account subtype code is required.' })
  @Length(5, 25, { message: 'Account subtype code must be between 5 and 25 characters.' }) // Min 5, Max 25
  @Matches(/^[a-z-]+\.[a-z-]+$/, { message: 'Account subtype code must match the pattern /^[a-z-]+\\.[a-z-]+$/.' }) // Regex pattern
  code: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Account subtype name is required.' })
  @Length(5, 30, { message: 'Account subtype name must be between 5 and 30 characters.' }) // Min 5, Max 30
  name: string;

  @ManyToOne(() => AccountType, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_type_id' })
  @IsNotEmpty({ message: 'AccountType must be specified.' })
  @Type(() => AccountType)
  type: AccountType;

  @Column({ name: 'account_type_id', type: 'bigint' })
  @IsInt({ message: 'Account type ID must be an integer.' })
  @Type(() => Number)
  @Index()
  accountTypeId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
