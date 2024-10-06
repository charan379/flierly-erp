import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Address } from '../address/Address.entity';
import { Branch } from '../branch/Branch.entity';
import { TaxIdentity } from '../taxation/TaxIdentity.entity';
import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { AccountType } from './AccountType.entity';
import { AccountSubtype } from './AccountSubtype.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToOne(() => AccountType, { eager: true, nullable: false })
    @JoinColumn({ name: 'account_type_id' })
    accountType: AccountType;

    @ManyToOne(() => AccountSubtype, { eager: true, nullable: false })
    @JoinColumn({ name: 'account_subtype_id' })
    accountSubtype: AccountSubtype;

    @Column({ type: 'boolean', default: false, name: 'is_vip' })
    isVip: boolean;

    @Column({ type: 'boolean', default: false, name: 'is_key' })
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

    @ManyToOne(() => TaxIdentity, { eager: true, nullable: true })
    @JoinColumn({ name: 'tax_identity_id' })
    taxIdentity: TaxIdentity;

    @ManyToOne(() => Account, { eager: false, nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Account;

    @OneToOne(() => Address, { eager: true, nullable: true })
    @JoinColumn({ name: 'primary_address_id' })
    primaryAddress: Address;

    @ManyToOne(() => Branch, { eager: true, nullable: true })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}