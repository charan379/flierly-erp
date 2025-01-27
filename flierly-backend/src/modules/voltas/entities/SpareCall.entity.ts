import Product from "@/modules/inventory/entities/Product.entity";
import Branch from "@/modules/organization/entities/Branch.entity";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpareCallStatus } from "../constants/spare-call-status.enum";


@Entity('spare_calls')
export default class SpareCall {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    @IsInt({ message: 'Spare Call ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ name: "customer_name", type: 'varchar', length: 100 })
    @Index()
    @IsNotEmpty({ message: 'Customer name must not be empty.' })
    @Length(3, 90, { message: 'Customer name must be between 3 and 90 characters.' })
    customerName: string;

    @Column({ name: "service_request", type: 'varchar', length: 30 })
    @IsNotEmpty({ message: 'Service Request must not be empty.' })
    @Index()
    @Matches(/^[2]\d{10}$/, { message: 'Service Request number is not valid' })
    @Length(11, 11, { message: 'Service Request must be between 3 and 90 characters.' })
    serviceRequest: string;

    @Column({ name: 'customer_mobile', type: 'varchar', length: 30, unique: true })
    @IsNotEmpty({ message: 'Account registered phone is required.' })
    @Index()
    @Matches(/^\d{10}$/, { message: 'Customer Mobile number is not valid' })
    customerMobile: string;

    @Column({ name: "customer_area", type: 'varchar', length: 100, unique: true })
    @IsNotEmpty({ message: 'Customer area must not be empty.' })
    @Index()
    @Length(3, 90, { message: 'Customer area must be between 3 and 90 characters.' })
    customerArea: string;

    @Column({ name: 'spare_received_date', type: 'date' })
    @IsNotEmpty({ message: 'Spare Received Date must not be empty.' })
    @Type(() => Date)
    @IsDate()
    spareReceivedDate: Date;

    @Column({ name: 'spare_dispatched_date', type: 'date' })
    @IsNotEmpty({ message: 'Spare Received Date must not be empty.' })
    @Type(() => Date)
    @IsDate()
    spareDispatchedDate: Date;

    @ManyToOne(() => Product, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    product: Product;

    @Column({ name: 'product_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Product ID must be an integer.' })
    productId: number;

    @ManyToOne(() => Branch, { eager: false, nullable: false })
    @JoinColumn({ name: "branch_id" })
    branch: Branch;

    @Column({ name: 'branch_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Branch ID must be an integer.' })
    branchId: number;

    @Column({ type: 'varchar', length: 50, unique: false, nullable: true, name: "reference_id" })
    @Index()
    @IsOptional()
    @Length(1, 40, { message: 'ReferenceID must be between 1 and 40 characters.' })
    @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'ReferenceID is not valid only capital letters, numbers, underscores and hyphens allowed.' })
    referenceId?: string; // sale invoice or purchase invoice number, etc.

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(2, 250, { message: 'Comments must be between 2 and 250 characters.' })
    comments: string;

    @Column({ type: 'boolean', default: true, name: 'is_multi_spare' })
    @IsBoolean()
    @Type(() => Boolean)
    isMultiSpare: boolean;

    @Column({
        type: 'enum',
        enum: SpareCallStatus,
        default: SpareCallStatus.OPEN,
        name: "status",
        nullable: false,
    })
    status: SpareCallStatus;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}