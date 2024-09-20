import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { AccountType } from './AccountType.entity';

@Entity('account_subtypes')
export class AccountSubtype {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Account subtype code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Account subtype name is required.' })
    name: string;

    @ManyToOne(() => AccountType, type => type.subtypes, { eager: true })
    @JoinColumn({ name: 'account_type_id' })
    accountType: AccountType;
}
