import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length, Matches, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InventoryEntryType } from "../constants/inventory-entry-type.enum";
import { InventoryTransactionType } from "../constants/inventory-transaction-type.enum";
import { NumericTransformer } from "@/lib/database/typeorm/utils/NumericTransformer";
import { InventoryTransactionRefDocType } from "../constants/inventory-transaction-ref-doc-type.enum";
import Inventory from "./Inventory.entity";
import Product from "@/modules/product/entities/Product.entity";

@Entity('inventory_transactions')
export default class InventoryTransaction {

    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    id: number;

    @ManyToOne(() => Inventory, { eager: false, nullable: false })
    @JoinColumn({ name: "inventory_id" })
    @IsOptional()
    @Type(() => Inventory)
    inventory?: Inventory;

    @Column({ name: 'inventory_id', type: 'bigint', transformer: NumericTransformer })
    @Index()
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    inventoryId: number;

    @ManyToOne(() => Product, { eager: false, nullable: false, })
    @JoinColumn({ name: "product_id", })
    @IsOptional()
    @Type(() => Product)
    product?: Product;

    @Column({ name: 'product_id', type: 'bigint', transformer: NumericTransformer })
    @Index()
    @Type(() => Number)
    @IsInt()
    productId: number;

    @Column({ type: 'boolean', default: false, name: 'is_rolled_back' })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isRolledBack: boolean;

    @Column({ type: 'boolean', default: false, name: 'is_a_roll_back' })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isARollBack: boolean;

    @Column({ name: 'rollback_transaction_id', type: 'varchar', length: 20, default: null, nullable: true })
    @Type(() => String)
    @IsInt()
    @IsOptional()
    rollbackTransactionId?: string;

    @Column("decimal", { precision: 15, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber()
    @Min(0)
    @IsNumber()
    @Type(() => Number)
    quantity: number;

    @Column({ type: 'decimal', name: "cost_per_unit", precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber()
    @IsPositive()
    @Min(0)
    @IsNumber()
    @Type(() => Number)
    costPerUnit: number;

    @Column({ type: 'enum', enum: InventoryEntryType, name: "entry_type" })
    @IsEnum(InventoryEntryType)
    entryType: InventoryEntryType;

    @Column({ type: 'enum', enum: InventoryTransactionType, name: "transaction_type" })
    @IsEnum(InventoryTransactionType)
    transactionType: InventoryTransactionType;

    @Column({ type: 'enum', enum: InventoryTransactionRefDocType, name: "reference_doc_type", nullable: true })
    @IsEnum(InventoryTransactionRefDocType)
    @IsOptional()
    referenceDocType?: InventoryTransactionRefDocType;

    @Column({ type: 'varchar', length: 50, unique: false, nullable: true, name: "reference_id" })
    @Index()
    @IsOptional()
    @Length(1, 40)
    @Matches(/^[A-Z0-9_#-]{1,40}$/)
    referenceDocId?: string; // sale invoice or purchase invoice number, etc.

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(10, 250)
    remarks: string;

    @Column({ type: 'varchar', length: 100, name: 'product_serial_number', nullable: true })
    @Length(5, 30)
    @IsOptional()
    @Matches(/^[A-Z0-9-]{5,30}$/)
    productSerialNumber: string;

    @CreateDateColumn({ name: 'transaction_date', type: 'timestamptz' })
    transactionDate: Date;
}