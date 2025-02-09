import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique, DeleteDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import Address from '@/modules/address/entities/Address.entity';
import { IsNotEmpty, IsOptional, Matches, ValidationError } from 'class-validator';

@Entity('tax_identities')
@Unique(['gst'])
@Unique(['pan'])
@Unique(['vat'])
@Unique(['tin'])
export default class TaxIdentity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: true, name: 'gst_no' })
  @IsOptional()
  @IsNotEmpty({ message: 'GST number is not allowed to be empty.' })
  @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { message: 'GST number is not valid.' })
  gst: string;

  @Column({ type: 'date', nullable: true, name: 'gst_registration_date' })
  @IsOptional()
  gstRegistrationDate: Date;

  @Column({ default: false, name: 'gst_verified' })
  gstVerified: boolean;

  @OneToOne(() => Address, { eager: false, nullable: true })
  @JoinColumn({ name: 'gst_address_id', referencedColumnName: 'id' })
  gstAddress: Address;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'PAN number is not allowed to be empty.' })
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'PAN number is not valid.' })
  pan: string;

  @Column({ default: false, name: 'pan_verified' })
  panVerified: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'VAT number is not allowed to be empty.' })
  @Matches(/^(ATU[0-9]{8}|BE0[0-9]{9}|BG[0-9]{9,10}|...)$/, { message: 'VAT number is not valid.' })
  vat: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'TIN number is not allowed to be empty.' })
  tin: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;

  // Hook for validation before insert
  @BeforeInsert()
  @BeforeUpdate()
  async validateGSTDetails(): Promise<void> {
    if (this.gst) {
      if (!this.gstRegistrationDate || !this.gstAddress) {
        const error = new ValidationError();
        error.property = 'gst';
        error.constraints = {
          isComplete: 'GST_DETAILS_INCOMPLETE',
        };
        throw error;
      }
    }
  }
}
