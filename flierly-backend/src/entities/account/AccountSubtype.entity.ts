import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { AccountType } from './AccountType.entity';

@Entity('account_subtypes')
export class AccountSubtype {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Account subtype code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Account subtype name is required.' })
    name: string;

    @ManyToOne(() => AccountType, { eager: true, nullable: false })
    @JoinColumn({ name: 'account_type_id' })
    accountType: AccountType;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
