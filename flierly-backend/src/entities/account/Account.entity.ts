import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Contact } from '../contact/Contact.entity';
import { Address } from '../address/Address.entity';
import { Branch } from '../branch/Branch.entity';
import { TaxIdentity } from '../taxation/TaxIdentity.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AccountType } from './AccountType.entity';
import { AccountSubtype } from './AccountSubtype.entity';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ type: 'boolean', default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @ManyToOne(() => AccountType, { eager: true })
    @JoinColumn({ name: 'account_type_id' })
    accountType: AccountType;

    @ManyToOne(() => AccountSubtype, { eager: true })
    @JoinColumn({ name: 'account_subtype_id' })
    accountSubtype: AccountSubtype;

    @Column({ type: 'boolean', default: false, name: 'is_vip' })
    isVip: boolean;

    @Column({ type: 'boolean', default: false, name: 'is_key' })
    isKey: boolean;

    @Column()
    @IsNotEmpty({ message: 'Account name is required.' })
    name: string;

    @Column({ name: 'registered_phone' })
    @IsNotEmpty({ message: 'Account registered phone is required.' })
    registeredPhone: string;

    @Column({ nullable: true, name: 'alternate_phone' })
    alternatePhone: string;

    @Column()
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty({ message: 'Account email is required.' })
    email: string;

    @ManyToOne(() => TaxIdentity, { eager: true })
    @JoinColumn({ name: 'tax_identity_id' })
    taxIdentity: TaxIdentity;

    @ManyToOne(() => Account, { eager: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Account;

    @OneToMany(() => Address, address => address.account)
    addresses: Address[];

    @ManyToOne(() => Address, { eager: true })
    @JoinColumn({ name: 'primary_address_id' })
    primaryAddress: Address;

    @OneToMany(() => Contact, contact => contact.account)
    contacts: Contact[];

    @ManyToOne(() => Branch, { eager: true })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
