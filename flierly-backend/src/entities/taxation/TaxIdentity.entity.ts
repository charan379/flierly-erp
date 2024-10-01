import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique, DeleteDateColumn } from 'typeorm';
import { Address } from '../address/Address.entity';
import { Matches } from 'class-validator';
import { IsGSTComplete } from '@/utils/entity-validators/IsGSTComplete';

@Entity('tax_identities')
@Unique(['gst'])
@Unique(['pan'])
@Unique(['vat'])
@Unique(['tin'])
@IsGSTComplete({
    message: 'GST Registration Date and GST Address must be provided if GST is present.'
})
export class TaxIdentity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ nullable: true, name: 'gst_no' })
    @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { message: "GST number is not valid." })
    gst: string;

    @Column({ type: 'date', nullable: true, name: 'gst_registration_date' })
    gstRegistrationDate: Date;

    @Column({ default: false, name: 'gst_verified' })
    gstVerified: boolean;

    @OneToOne(() => Address, { eager: true })
    @JoinColumn({ name: 'gst_address_id', referencedColumnName: 'id' })
    gstAddress: Address;

    @Column({ nullable: true })
    @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "PAN number is not valid." })
    pan: string;

    @Column({ default: false, name: 'pan_verified' })
    panVerified: boolean;

    @Column({ nullable: true })
    @Matches(/^(ATU[0-9]{8}|BE0[0-9]{9}|BG[0-9]{9,10}|CY[0-9]{8}L|CZ[0-9]{8,10}|DE[0-9]{9}|DK[0-9]{8}|EE[0-9]{9}|EL[0-9]{9}|ES[0-9A-Z][0-9]{7}[0-9A-Z]|FI[0-9]{8}|FR[0-9A-Z]{2}[0-9]{9}|GB([0-9]{9}|[0-9]{12}|GD[0-9]{3}|HA[0-9]{3})|HU[0-9]{8}|IE[0-9A-Z]{8}|IT[0-9]{11}|LT([0-9]{9}|[0-9]{12})|LU[0-9]{8}|LV[0-9]{11}|MT[0-9]{8}|NL[0-9]{9}B[0-9]{2}|PL[0-9]{10}|PT[0-9]{9}|RO[0-9]{2,10}|SE[0-9]{12}|SI[0-9]{8}|SK[0-9]{10})$/, { message: "VAT number is not valid." })
    vat: string;

    @Column({ nullable: true })
    tin: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}