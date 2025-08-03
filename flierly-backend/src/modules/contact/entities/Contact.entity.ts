import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsOptional, Matches, Length, IsInt, IsBoolean } from 'class-validator';
import Account from '@/modules/account/entities/Account.entity';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('contacts')
export default class Contact {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @Column({ name: 'name' })
  @IsNotEmpty()
  @Length(5, 90)
  name: string;

  @Column({ nullable: true, name: 'email' })
  @IsOptional()
  @IsEmail()
  email: string;

  @Column({ name: 'phone' })
  @IsNotEmpty()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  phone: string;

  @Column({ nullable: true, name: 'alternate_phone' })
  @IsOptional()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  alternatePhone: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  @Type(() => Account)
  @IsOptional()
  account?: Account;

  @Column({ name: 'account_id', type: 'bigint', nullable: true })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  accountId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
