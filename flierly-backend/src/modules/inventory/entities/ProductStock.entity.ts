import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, Index, Unique } from "typeorm";
import Product from "./Product.entity";
import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { IsNumber, Min } from "class-validator";
import Branch from "@/modules/organization/entities/Branch.entity";

@Entity("product_stocks")
@Index(["product", "branch"], { unique: true })
@Unique(["product", "branch"])
export default class ProductStock {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(() => Product, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    product: Product;

    @ManyToOne(() => Branch, { eager: false, nullable: false })
    @JoinColumn({ name: "branch_id" })
    branch: Branch;

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_hand", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnHand Quantity must be a valid number' })
    @Min(0, { message: 'OnHand Quantity cannot be negative' })
    onHand: number; // Total quantity physically present in inventory

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_order", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    onOrder: number; // Total quantity in purchase orders

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    reserved: number; // Quantity reserved for orders or allocation

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Defective Quantity must be a valid number' })
    @Min(0, { message: 'Defectives Quantity cannot be negative' })
    defective: number; // Quantity marked as defective

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Available Quantity must be a valid number' })
    available: number; // Calculated as `onHandQuantity - reservedQuantity - defectiveQuantity`

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}
