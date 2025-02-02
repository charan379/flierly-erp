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
} from 'typeorm';
import Address from '@/modules/address/entities/Address.entity';
import TaxIdentity from '@/modules/taxation/entities/TaxIdentity.entity';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import AccountType from './AccountType.entity';
import AccountSubtype from './AccountSubtype.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';
import { Type } from 'class-transformer';

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean({ message: 'Active status must be a boolean value.' })
  @Type(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => AccountType, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_type_id' })
  @IsNotEmpty({ message: 'Account type must be specified' })
  @Type(() => AccountType)
  accountType: AccountType;

  @Column({ name: 'account_type_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Account type id must be an integer.' })
  accountTypeId: number;

  @ManyToOne(() => AccountSubtype, { eager: false, nullable: false })
  @JoinColumn({ name: 'account_subtype_id' })
  @IsNotEmpty({ message: 'Account subtype must be specified' })
  accountSubtype: AccountSubtype;

  @Column({ name: 'account_subtype_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Account Sub type id must be an integer.' })
  accountSubtypeId: number;

  @Column({ type: 'boolean', default: false, name: 'is_vip' })
  @IsBoolean()
  @Type(() => Boolean)
  isVip: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_key' })
  @IsBoolean()
  @Type(() => Boolean)
  isKey: boolean;

  @Column()
  @IsNotEmpty({ message: 'Account name is required.' })
  @Length(5, 90, { message: 'Account name must be between 5 and 90 characters.' })
  name: string;

  @Column({ name: 'registered_phone', unique: true })
  @IsNotEmpty({ message: 'Account registered phone is required.' })
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Registered Phone number is not valid' })
  registeredPhone: string;

  @Column({ nullable: true, name: 'alternate_phone' })
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Alternate Phone number is not valid' })
  @IsOptional()
  alternatePhone: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Account email is required.' })
  email: string;

  @ManyToOne(() => TaxIdentity, { eager: false, nullable: false })
  @JoinColumn({ name: 'tax_identity_id' })
  @Type(() => TaxIdentity)
  taxIdentity: TaxIdentity;

  @Column({ name: 'tax_identity_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Tax Identity id must be an integer.' })
  taxIdentityId: number;

  @ManyToOne(() => Account, { eager: false, nullable: true })
  @JoinColumn({ name: 'parent_id' })
  @Type(() => Account)
  parent: Account;

  @Column({ name: 'parent_id', type: 'bigint', nullable: true })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Parent id must be an integer.' })
  parentId: number;

  @OneToOne(() => Address, { eager: false, nullable: false })
  @JoinColumn({ name: 'primary_address_id' })
  @Type(() => Address)
  primaryAddress: Address;

  @Column({ name: 'primary_address_id', type: 'bigint' })
  @Index()
  @Type(() => Number)
  @IsInt({ message: 'Primary Address id must be an integer.' })
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
          await transactionalEntityManager.update(Address, this.primaryAddress.id, {
            account: this, // Update the address with the account reference
          });
        } catch (_error) {
          throw new Error('Failed to update address during account creation or update.');
        }
      });
    }
  }
}
