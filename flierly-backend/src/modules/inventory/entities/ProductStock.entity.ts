import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import Product from "./Product.entity";

@Entity("product_stocks")
export default class ProductStock {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(() => Product, (product) => product.stock, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    product: Product;

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_hand" })
    onHand: number; // Total quantity physically present in inventory

    @Column("decimal", { precision: 15, scale: 2, default: 0, name: "on_order" })
    onOrder: number; // Total quantity in purchase orders

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    reserved: number; // Quantity reserved for orders or allocation

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    defective: number; // Quantity marked as defective

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    available: number; // Calculated as `onHandQuantity - reservedQuantity - defectiveQuantity`

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
