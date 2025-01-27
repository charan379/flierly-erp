import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm';
import { IsNotEmpty, IsEmail, IsOptional, Matches, Length, IsInt, IsBoolean } from 'class-validator';
import Account from '@/modules/account/entities/Account.entity';
import { Type } from 'class-transformer';

@Entity('contacts')
export default class Contact {
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

  @Column({ name: 'name' })
  @IsNotEmpty({ message: 'Contact name is required.' })
  @Length(5, 90, { message: 'Contact name must be between 5 and 90 characters.' })
  name: string;

  @Column({ nullable: true, name: 'email' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @Column({ name: 'phone' })
  @IsNotEmpty({ message: 'Contact phone is required.' })
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Contact phone must be in the format: +<country_code> <10-digit_number>' })
  phone: string;

  @Column({ nullable: true, name: 'alternate_phone' })
  @IsOptional()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Alternate phone must be in the format: +<country_code> <10-digit_number>' })
  alternatePhone: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  @Type(() => Account)
  account: Account;

  @Column({ name: 'account_id', type: 'bigint', nullable: true })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Account id must be an integer.' })
  accountId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
