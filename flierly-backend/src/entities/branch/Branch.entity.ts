import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, DeleteDateColumn } from 'typeorm';
import { Address } from '../address/Address.entity';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { TaxIdentity } from '../taxation/TaxIdentity.entity';

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column()
    @IsNotEmpty({ message: 'Branch name is required.' })
    @Length(5, 90, { message: 'Branch name must be between 5 and 90 characters.' })
    name: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty({ message: 'Branch email is required.' })
    email: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Branch phone number is required.' })
    @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Branch phone number must be in the format: +<country_code> <10-digit_number>' })
    phone: string;

    @Column({ nullable: true, name: 'alternate_phone' })
    @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Alternate phone number must be in the format: +<country_code> <10-digit_number>' })
    alternatePhone: string;

    @OneToOne(() => Address, { eager: true })
    @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
    address: Address;

    @ManyToOne(() => TaxIdentity, { eager: true })
    @JoinColumn({ name: 'tax_identity_id', referencedColumnName: 'id' })
    taxIdentity: TaxIdentity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
