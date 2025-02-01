import { DecimalTransformer } from "@/lib/database/typeorm/utils/DecimalTransformer";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, Length, Matches, Min } from "class-validator";
import { Column, CreateDateColumn, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InventoryEntryType } from "../constants/inventory-entry-type.enum";
import { InventoryTransactionType } from "../constants/inventory-transaction-type.enum";
import { NumericTransformer } from "@/lib/database/typeorm/utils/NumericTransformer";

export default class InventoryTransaction {

    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt({ message: 'Stock Transaction ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ type: 'boolean', default: false, name: 'is_rolled_back' })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isRolledBack: boolean;

    @Column({ type: 'boolean', default: false, name: 'is__a_roll_back' })
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isARollBack: boolean;

    @Column({ name: 'rollback_transaction_id', type: 'bigint', transformer: NumericTransformer, nullable: true })
    @Type(() => Number)
    @IsInt({ message: 'Rollback transaction ID must be an integer.' })
    @IsOptional()
    rollbackTransactionId: number;

    @Column("decimal", { precision: 15, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Quantity must be a valid number' })
    @Min(0, { message: 'Quantity cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    quantity: number;

    @Column({ type: 'decimal', name: "cost_per_unit", precision: 10, scale: 2, default: 0, transformer: DecimalTransformer })
    @IsNumber({}, { message: 'Cost per unit must be a valid number' })
    @IsPositive({ message: 'Cost per unit must be greater than zero' })
    @Min(0, { message: 'Cost per unit cannot be negative' })
    @IsNumber()
    @Type(() => Number)
    costPerUnit: number;

    @Column({ type: 'enum', enum: InventoryEntryType, name: "entry_type" })
    @IsEnum(InventoryEntryType)
    entryType: InventoryEntryType;

    @Column({ type: 'enum', enum: InventoryTransactionType, name: "transaction_type" })
    @IsEnum(InventoryTransactionType)
    transactionType: InventoryTransactionType;

    @Column({ type: 'enum', enum: InventoryTransactionType, name: "reference_doc_type" })
    @IsEnum(InventoryTransactionType)
    referenceDocType: InventoryTransactionType;

    @Column({ type: 'varchar', length: 50, unique: false, nullable: true, name: "reference_id" })
    @Index()
    @IsOptional()
    @Length(1, 40, { message: 'ReferenceDocID must be between 1 and 40 characters.' })
    @Matches(/^[A-Z0-9_#-]{1,40}$/, { message: 'ReferenceID is not valid only capital letters, numbers, underscores and hyphens allowed.' })
    referenceDocId?: string; // sale invoice or purchase invoice number, etc.
    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    remarks: string;

    @Column({ type: 'varchar', length: 100, name: 'product_serial_number', nullable: true })
    @Length(5, 30, { message: 'Product Serial number must be between 3 and 30 characters.' })
    @IsOptional()
    @Matches(/^[A-Z0-9-]{5,30}$/, { message: 'Product Serial number is not valid only capital letters, numbers and hyphens allowed.' })
    productSerialNumber: string;

    @CreateDateColumn({ name: 'transaction_date', type: 'timestamptz' })
    transactionDate: Date;
}