import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, Index, Unique } from "typeorm";
import Product from "./Product.entity";
import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";
import Branch from "@/modules/organization/entities/Branch.entity";
import { Type } from "class-transformer";

@Entity("product_stocks")
@Index(["product", "branch"], { unique: true })
export default class ProductStock {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @IsInt({ message: 'Product Stock ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

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

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_hand", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnHand Quantity must be a valid number' })
    @Min(0, { message: 'OnHand Quantity cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    onHand: number; // Total quantity physically present in inventory

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_order", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    onOrder: number; // Total quantity in purchase orders

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    reserved: number; // Quantity reserved for orders or allocation

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Defective Quantity must be a valid number' })
    @Min(0, { message: 'Defectives Quantity cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    defective: number; // Quantity marked as defective

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}
