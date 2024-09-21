import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
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

    @Column()
    @IsNotEmpty({ message: 'Contact name is required.' })
    name: string;

    @Column({ nullable: true })
    @IsEmail({}, { message: 'Invalid email format.' })
    email: string;

    @Column()
    @IsNotEmpty({ message: 'Contact phone is required.' })
    phone: string;

    @Column({ nullable: true })
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

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
