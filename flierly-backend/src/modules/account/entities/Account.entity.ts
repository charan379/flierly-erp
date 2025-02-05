import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  BeforeInsert,
  Repository,
  Index,
  PrimaryColumn,
} from 'typeorm';
import Address from '@/modules/address/entities/Address.entity';
import TaxIdentity from '@/modules/taxation/entities/TaxIdentity.entity';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import AccountType from './AccountType.entity';
import AccountSubtype from './AccountSubtype.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('accounts')
export default class Account {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @ManyToOne(() => AccountType, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_type_id' })
  @Type(() => AccountType)
  @IsOptional()
  accountType?: AccountType;

  @Column({ name: 'account_type_id', type: 'bigint', transformer: NumericTransformer })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  accountTypeId: number;

  @ManyToOne(() => AccountSubtype, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_subtype_id' })
  @IsOptional()
  @Type(() => AccountSubtype)
  accountSubtype?: AccountSubtype;

  @Column({ name: 'account_subtype_id', type: 'bigint', transformer: NumericTransformer })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  accountSubtypeId: number;

  @Column({ type: 'boolean', default: false, name: 'is_vip' })
  @IsBoolean()
  @Type(() => Boolean)
  isVip: boolean = false;

  @Column({ type: 'boolean', default: false, name: 'is_key' })
  @IsBoolean()
  @Type(() => Boolean)
  isKey: boolean = false;

  @Column()
  @IsNotEmpty()
  @Length(5, 90)
  name: string;

  @Column({ name: 'registered_phone', unique: true })
  @IsNotEmpty()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  registeredPhone: string;

  @Column({ nullable: true, name: 'alternate_phone' })
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  @IsOptional()
  alternatePhone?: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ManyToOne(() => TaxIdentity, { eager: false, nullable: false })
  @JoinColumn({ name: 'tax_identity_id' })
  @Type(() => TaxIdentity)
  @IsOptional()
  taxIdentity?: TaxIdentity;

  @Column({ name: 'tax_identity_id', type: 'bigint', transformer: NumericTransformer })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  taxIdentityId: number;

  @ManyToOne(() => Account, { eager: false, nullable: true })
  @JoinColumn({ name: 'parent_id' })
  @Type(() => Account)
  @IsOptional()
  parent?: Account;

  @Column({ name: 'parent_id', type: 'bigint', nullable: true, transformer: NumericTransformer })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  parentId?: number;

  @OneToOne(() => Address, { eager: false, nullable: false })
  @JoinColumn({ name: 'primary_address_id' })
  @Type(() => Address)
  @IsOptional()
  primaryAddress?: Address;

  @Column({ name: 'primary_address_id', type: 'bigint', transformer: NumericTransformer })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  primaryAddressId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;

  // Hook that runs before inserting or updating an account
  @BeforeInsert()
  async updatePrimaryAddress(): Promise<void> {
    // Check if the account has a primary address that needs to be updated
    if (this.primaryAddress) {
      const repository: Repository<Address> = AppDataSource.getRepository(Address);

      // Fetch the current address associated with the primary address
      const currentAddress = await repository.findOne({
        where: { id: this.primaryAddress.id }, // Filter by the primary address ID
        select: ['id', 'account'], // Select only the 'id' and 'account' fields
      });

      // If the account is already set and matches the current account, skip the update
      if (currentAddress?.account?.id === this.id) {
        return; // No need to update since the account ID is the same
      }

      // Use a transaction to ensure consistency
      await AppDataSource.transaction(async (transactionalEntityManager) => {
        try {
          await transactionalEntityManager.update(Address, this.primaryAddressId, {
            account: this, // Update the address with the account reference
          });
        } catch (_error) {
          throw new Error('Failed to update address during account creation or update.');
        }
      });
    }
  }
}
