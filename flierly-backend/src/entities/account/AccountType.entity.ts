import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('account_types')
export class AccountType {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Account type code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Account type name is required.' })
    name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
