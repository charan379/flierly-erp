import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import Product from "./Product.entity";
import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { IsNumber, IsPositive, Min } from "class-validator";

@Entity("product_stocks")
export default class ProductStock {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(() => Product, (product) => product.stock, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    product: Product;

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_hand", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnHand Quantity must be a valid number' })
    @IsPositive({ message: 'OnHand Quantity must be greater than zero' })
    @Min(0, { message: 'OnHand Quantity cannot be negative' })
    onHand: number; // Total quantity physically present in inventory

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_order", transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @IsPositive({ message: 'OnOrder Quantity must be greater than zero' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    onOrder: number; // Total quantity in purchase orders

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'OnOrder Quantity must be a valid number' })
    @IsPositive({ message: 'OnOrder Quantity must be greater than zero' })
    @Min(0, { message: 'OnOrder Quantity cannot be negative' })
    reserved: number; // Quantity reserved for orders or allocation

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Defective Quantity must be a valid number' })
    @IsPositive({ message: 'Defective Quantity must be greater than zero' })
    @Min(0, { message: 'Defectives Quantity cannot be negative' })
    defective: number; // Quantity marked as defective

    @Column("decimal", { precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Available Quantity must be a valid number' })
    available: number; // Calculated as `onHandQuantity - reservedQuantity - defectiveQuantity`

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
