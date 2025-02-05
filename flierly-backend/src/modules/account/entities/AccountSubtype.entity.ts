import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, Index, Unique, PrimaryColumn } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import AccountType from './AccountType.entity';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('account_subtypes')
@Unique(['name', 'accountTypeId'])
export default class AccountSubtype {

  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @Column()
  @IsNotEmpty()
  @Length(5, 30)
  name: string;

  @ManyToOne(() => AccountType, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_type_id' })
  @Type(() => AccountType)
  @IsOptional()
  accountType?: AccountType;

  @Column({ name: 'account_type_id', type: 'bigint', transformer: NumericTransformer })
  @IsInt()
  @Type(() => Number)
  @Index()
  @IsNotEmpty()
  accountTypeId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
