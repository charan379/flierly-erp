import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, Index } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Length, Matches, ValidationError } from 'class-validator';
import Account from '@/modules/account/entities/Account.entity';
import { Type } from 'class-transformer';

@Entity('addresses')
export default class Address {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @Column({ name: 'line_1' })
  @IsNotEmpty()
  line1: string;

  @Column({ name: 'line_2' })
  @IsNotEmpty()
  line2: string;

  @Column({ nullable: true, name: 'line_3' })
  @IsOptional()
  line3?: string;

  @Column({ name: 'landmark' })
  @IsNotEmpty()
  landmark: string;

  @Column({ name: 'area' })
  @IsNotEmpty()
  area: string;

  @Column({ name: 'city' })
  @IsNotEmpty()
  city: string;

  @Column({ name: 'district' })
  @IsNotEmpty()
  district: string;

  @Column({ name: 'state' })
  @IsNotEmpty()
  state: string;

  @Column({ name: 'pincode' })
  @IsNotEmpty()
  @Matches(/^\d{6}$/)
  pincode: string;

  @Column({ nullable: true, name: 'contact_name' })
  @IsOptional()
  @IsNotEmpty()
  @Length(5, 90)
  contactName?: string;

  @Column({ nullable: true, name: 'contact_number' })
  @IsOptional()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  contactNumber?: string;

  @Column({ nullable: true, name: 'address_instructions' })
  @IsOptional()
  @IsNotEmpty()
  addressInstructions?: string;

  @IsNumber({})
  @Column({
    nullable: true,
    type: 'decimal',
    precision: 9,
    scale: 6,
    name: 'latitude',
  })
  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @IsNumber({})
  @Column({
    nullable: true,
    type: 'decimal',
    precision: 9,
    scale: 6,
    name: 'longitude',
  })
  @IsOptional()
  @Type(() => Number)
  longitude?: number;

  @ManyToOne(() => Account, { lazy: true, nullable: true })
  @JoinColumn({ name: 'account_id' })
  @Type(() => Account)
  @IsOptional()
  account?: Account;

  @Column({ name: 'account_id', type: 'bigint', nullable: true })
  @Index()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  accountId?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async validateCoordinates(): Promise<void> {
    const hasLatitude = this.latitude !== null && this.latitude !== undefined;
    const hasLongitude = this.longitude !== null && this.longitude !== undefined;

    if (hasLatitude !== hasLongitude) {
      const error = new ValidationError();
      error.property = 'coordinates';
      error.constraints = {
        isDefined: 'Both latitude and longitude must be provided together or not at all.',
      };
      throw error;
    }
  }
}
