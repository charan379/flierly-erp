import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, Index, Unique, PrimaryColumn } from "typeorm";
import Product from "./Product.entity";
import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { NumericTransformer } from "@/lib/database/typeorm/utils/NumericTransformer";
import Inventory from "@/modules/inventory/entities/Inventory.entity";

@Entity("product_stocks")
@Index(["productId", "inventoryId"], { unique: true })
export default class ProductStock {

    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt({ message: 'Product Stock ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

    @ManyToOne(() => Product, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    @IsOptional()
    @Type(() => Product)
    product!: Product;

    @Column({ name: 'product_id', type: 'bigint', transformer: NumericTransformer })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Product ID must be an integer.' })
    productId: number;

    @ManyToOne(() => Inventory, { eager: false, nullable: true, })
    @JoinColumn({ name: "inventory_id", })
    @IsOptional()
    @Type(() => Inventory)
    inventory!: Inventory;

    @Column({ name: 'inventory_id', type: 'bigint', transformer: NumericTransformer, nullable: true })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Inventory ID must be an integer.' })
    inventoryId: number;

    @Column("decimal", { precision: 15, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Balance Quantity must be a valid number' })
    // @Min(0, { message: 'Balance Quantity cannot be negative' })
    @Type(() => Number)
    balance: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}
