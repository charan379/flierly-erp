import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsOptional, Matches, Length } from 'class-validator';
import { Account } from '../account/Account.entity';
import { Branch } from '../branch/Branch.entity';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
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
    account: Account;

    @ManyToOne(() => Branch)
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
