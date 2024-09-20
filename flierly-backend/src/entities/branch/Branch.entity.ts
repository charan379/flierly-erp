import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Address } from '../address/Address.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { TaxIdentity } from '../taxation/TaxIdentity.entity';

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ nullable: false })
    @IsNotEmpty()
    name: string;

    @Column({ nullable: false })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    phone: string;

    @Column({ nullable: true, name: 'alternate_phone' })
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
}
