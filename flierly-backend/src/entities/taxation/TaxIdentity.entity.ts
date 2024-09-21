import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique, DeleteDateColumn } from 'typeorm';
import { Address } from '../address/Address.entity';

@Entity('tax_identities')
@Unique(['gst'])
@Unique(['pan'])
@Unique(['vat'])
@Unique(['tin'])
export class TaxIdentity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ nullable: true, name: 'gst_no' })
    gst: string;

    @Column({ type: 'date', nullable: true, name: 'gst_registration_date' })
    gstRegistrationDate: Date;

    @Column({ default: false, name: 'gst_verified' })
    gstVerified: boolean;

    @OneToOne(() => Address, { eager: true })
    @JoinColumn({ name: 'gst_address_id', referencedColumnName: 'id' })
    gstAddress: Address;

    @Column({ nullable: true })
    pan: string;

    @Column({ default: false, name: 'pan_verified' })
    panVerified: boolean;

    @Column({ nullable: true })
    vat: boolean;

    @Column({ nullable: true })
    tin: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}