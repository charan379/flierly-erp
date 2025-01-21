import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product.entity";
import { InventoryStockTransactionType as InventoryStockTransactionType } from "../constants/inventory-stock-transaction-type.enum";
import { IsNumber, IsOptional, Length, Matches } from "class-validator";
import { InventoryStockType } from "../constants/inventory-stock-type.enum";
import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import Branch from "@/modules/organization/entities/Branch.entity";

@Entity("inventory_ledger")
@Index(["product", "branch"], { unique: false })
export default class InventoryLedger {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => Product, { eager: false, nullable: false })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => Branch, { eager: false, nullable: false })
    @JoinColumn({ name: "branch_id" })
    branch: Branch;

    @Column({
        type: 'enum',
        enum: InventoryStockTransactionType,
        name: "transaction_type",
        nullable: false,
    })
    transactionType: InventoryStockTransactionType; // e.g., "sales_return_ok", "sales_return_defective", etc.

    @Column({
        type: 'enum',
        enum: InventoryStockType,
        name: "stock_type",
        nullable: false,
    })
    stockType: InventoryStockType; // e.g., "oh_hand", "defective", etc.

    @Column({ type: 'varchar', length: 50, unique: false, nullable: true, name: "reference_id" })
    @Index()
    @IsOptional()
    @Length(1, 40, { message: 'ReferenceID must be between 1 and 40 characters.' })
    @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'ReferenceID is not valid only capital letters, numbers, underscores and hyphens allowed.' })
    referenceId?: string; // sale invoice or purchase invoice number, etc.

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Quantity must be a valid number' })
    quantity: number; // Total quantity change - or +

    @CreateDateColumn({ name: 'transaction_date', type: 'timestamptz' })
    transactionDate: Date;

    @Column({ type: 'varchar', length: 100, name: 'product_serial_number', nullable: true })
    @Length(5, 30, { message: 'Product Serial number must be between 3 and 30 characters.' })
    @IsOptional()
    @Matches(/^[A-Z0-9-]{5,30}$/, { message: 'Product Serial number is not valid only capital letters, numbers and hyphens allowed.' })
    productSerialNumber: string;
};