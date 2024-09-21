import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, ValidationError } from 'class-validator';
import { Account } from '../account/Account.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn({
        type: "bigint"
    }) id: number;

    @Column({ default: true, name: "is_active" })
    isActive: boolean;

    @Column()
    @IsNotEmpty()
    line1: string;

    @Column()
    @IsNotEmpty()
    line2: string;

    @Column({ nullable: true })
    line3: string;

    @Column()
    @IsNotEmpty()
    landmark: string;

    @Column()
    @IsNotEmpty()
    area: string;

    @Column()
    @IsNotEmpty()
    city: string;

    @Column()
    @IsNotEmpty()
    district: string;

    @Column()
    @IsNotEmpty()
    state: string;

    @Column()
    @IsNotEmpty()
    pincode: string;

    @IsNumber()
    @Column({ nullable: true, type: 'double precision' })
    latitude: number;

    @IsNumber()
    @Column({ nullable: true, type: 'double precision' })
    longitude: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;

    @BeforeInsert()
    @BeforeUpdate()
    async validateCoordinates() {
        if ((this.latitude !== null && this.latitude !== undefined) || (this.longitude !== null && this.longitude !== undefined)) {
            if (this.latitude === null || this.latitude === undefined || this.longitude === null || this.longitude === undefined) {
                const error = new ValidationError();
                error.property = 'coordinates';
                error.constraints = {
                    isDefined: 'Both latitude and longitude must be provided together or not at all.'
                };
                throw error;
            }
        }
    }
}
