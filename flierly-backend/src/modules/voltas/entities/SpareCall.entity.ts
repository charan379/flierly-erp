import Branch from "@/modules/organization/entities/Branch.entity";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SpareCallStatus } from "../constants/spare-call-status.enum";
import Product from "@/modules/product/entities/Product.entity";


@Entity('spare_calls')
export default class SpareCall {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ name: "customer_name", type: 'varchar', length: 100 })
    @Index()
    @IsNotEmpty()
    @Length(3, 90)
    customerName: string;

    @Column({ name: "service_request", type: 'varchar', length: 30 })
    @IsNotEmpty()
    @Index()
    @Matches(/^[2]\d{10}$/)
    @Length(11, 11)
    serviceRequest: string;

    @Column({ name: 'customer_mobile', type: 'varchar', length: 30, unique: true })
    @IsNotEmpty()
    @Index()
    @Matches(/^\d{10}$/)
    customerMobile: string;

    @Column({ name: "customer_area", type: 'varchar', length: 100, unique: true })
    @IsNotEmpty()
    @Index()
    @Length(3, 90)
    customerArea: string;

    @Column({ name: 'spare_received_date', type: 'date' })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    spareReceivedDate: Date;

    @Column({ name: 'spare_dispatched_date', type: 'date' })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    spareDispatchedDate: Date;

    @ManyToOne(() => Product, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    @IsOptional()
    product?: Product;

    @Column({ name: 'product_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ManyToOne(() => Branch, { eager: false, nullable: false })
    @JoinColumn({ name: "branch_id" })
    @IsOptional()
    branch: Branch;

    @Column({ name: 'branch_id', type: 'bigint' })
    @Index()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    branchId: number;

    @Column({ type: 'varchar', length: 50, unique: false, nullable: true, name: "reference_id" })
    @Index()
    @IsOptional()
    @Length(1, 40)
    @Matches(/^[A-Z0-9_#-]{1,40}$/)
    referenceId?: string; // sale invoice or purchase invoice number, etc.

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(2, 250)
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
    status: SpareCallStatus = SpareCallStatus.OPEN;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}