import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Table, UpdateDateColumn } from "typeorm";
import Product from "./Product.entity";
import { InventoryLedgerTransactionType } from "../constants/inventory-ledger-transaction-type.enum";
import { IsNumber, IsOptional, IsPositive, Length, Matches, Min } from "class-validator";
import { InventoryLedgerStockType } from "../constants/inventory-ledger-stock-type.enum";
import { DecimalTransformer } from "@/lib/typeorm/utils/DecimalTransformer";

@Entity("inventory_ledger")
export default class InventoryLedger {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @ManyToOne(() => Product, (product) => product.ledgers, { nullable: false })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column({
        type: 'enum',
        enum: InventoryLedgerTransactionType,
        name: "transaction_type",
        nullable: false,
    })
    transactionType: InventoryLedgerTransactionType; // e.g., "sales_return_ok", "sales_return_defective", etc.

    @Column({
        type: 'enum',
        enum: InventoryLedgerStockType,
        name: "stock_type",
        nullable: false,
    })
    stockType: InventoryLedgerStockType; // e.g., "oh_hand", "defective", etc.

    @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
    @Length(1, 40, { message: 'ReferenceID must be between 1 and 40 characters.' })
    @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'ReferenceID is not valid only capital letters, numbers, underscores and hyphens allowed.' })
    referenceId: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Quantity must be a valid number' })
    quantity: number; // Total quantity change - or +

    @CreateDateColumn({ name: 'transaction_date', type: 'timestamptz' })
    transactionDate: Date;
};