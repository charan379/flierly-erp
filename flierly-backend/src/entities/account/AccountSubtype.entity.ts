import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { AccountType } from './AccountType.entity';

@Entity('account_subtypes')
export class AccountSubtype {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
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
  accountType: AccountType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
