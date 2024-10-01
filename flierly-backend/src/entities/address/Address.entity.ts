import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, Length, Matches, ValidationError } from 'class-validator';
import { Account } from '../account/Account.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({ default: true, name: "is_active" })
    isActive: boolean;

    @Column({ name: 'line_1' })
    @IsNotEmpty({ message: "Address line 1 must not be empty." })
    line1: string;

    @Column({ name: 'line_2' })
    @IsNotEmpty({ message: "Address line 2 must not be empty." })
    line2: string;

    @Column({ nullable: true, name: 'line_3' })
    @IsOptional()
    line3: string;

    @Column({ name: 'landmark' })
    @IsNotEmpty({ message: "Landmark must not be empty." })
    landmark: string;

    @Column({ name: 'area' })
    @IsNotEmpty({ message: "Area must not be empty." })
    area: string;

    @Column({ name: 'city' })
    @IsNotEmpty({ message: "City must not be empty." })
    city: string;

    @Column({ name: 'district' })
    @IsNotEmpty({ message: "District must not be empty." })
    district: string;

    @Column({ name: 'state' })
    @IsNotEmpty({ message: "State must not be empty." })
    state: string;

    @Column({ name: 'pincode' })
    @IsNotEmpty({ message: "Pincode must not be empty." })
    @Matches(/^\d{6}$/, { message: "Pincode must be a 6-digit number." })
    pincode: string;

    @Column({ nullable: true, name: 'contact_name' })
    @IsOptional()
    @IsNotEmpty({ message: "Contact name must not be empty." })
    @Length(5, 90, { message: 'Contact name must be between 5 and 90 characters.' })
    contactName: string;

    @Column({ nullable: true, name: 'contact_number' })
    @IsOptional()
    @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Contact number must be in the format: +<country_code> <10-digit_number>' })
    contactNumber: string;

    @Column({ nullable: true, name: 'address_instructions' })
    @IsOptional()
    @IsNotEmpty({ message: "Address instructions must not be empty." })
    addressInstructions: string;

    @IsNumber({}, { message: "Latitude must be a number." })
    @Column({ nullable: true, type: 'double precision', name: 'latitude' })
    latitude: number;

    @IsNumber({}, { message: "Longitude must be a number." })
    @Column({ nullable: true, type: 'double precision', name: 'longitude' })
    longitude: number;

    @ManyToOne(() => Account, { lazy: true })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;

    @BeforeInsert()
    @BeforeUpdate()
    async validateCoordinates() {
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
