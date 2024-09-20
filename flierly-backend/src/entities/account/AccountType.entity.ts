import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { AccountSubtype } from './AccountSubtype.entity';

@Entity('account_types')
export class AccountType {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Account type code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Account type name is required.' })
    name: string;

    @OneToMany(() => AccountSubtype, subtype => subtype.accountType)
    subtypes: AccountSubtype[];
}
