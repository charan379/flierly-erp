import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Length } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InventoryType as InventoryType } from "../constants/inventory-type.enum";
import { NumericTransformer } from "@/lib/database/typeorm/utils/NumericTransformer";
import Branch from "@/modules/organization/entities/Branch.entity";

@Entity('inventories')
@Index(["branchId", "inventoryType"], { unique: false })
export default class Inventory {

    @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
    @IsInt({ message: 'Inventory ID must be an integer.' })
    @Type(() => Number)
    @IsOptional()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: false })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
    name: string;

    @Column({ type: 'enum', enum: InventoryType, default: InventoryType.AVAILABLE, name: "inventory_type" })
    @IsEnum(InventoryType)
    @IsOptional()
    inventoryType: InventoryType = InventoryType.AVAILABLE;

    @ManyToOne(() => Branch, { eager: false, nullable: false })
    @JoinColumn({ name: "branch_id" })
    @IsOptional()
    @Type(() => Branch)
    branch: Branch;

    @Column({ name: 'branch_id', type: 'bigint', transformer: NumericTransformer })
    @Index()
    @Type(() => Number)
    @IsInt({ message: 'Branch ID must be an integer.' })
    @IsNotEmpty({ message: 'Branch ID must not be empty.' })
    branchId: number;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(10, 250, { message: 'Description must be between 10 and 250 characters.' })
    remarks: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;

}