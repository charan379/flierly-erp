import Account from "@/modules/account/entities/Account.entity";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchaseOrderStatus } from "../constants/purchase-order-status.enum";
import Branch from "@/modules/organization/entities/Branch.entity";
import PurchaseOrderItem from "./PurchaseOrderItem.entity";  // Import PurchaseOrderItem

@Entity('purchase_invoices')
export default class PurchaseInvoice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account, (account) => account.id, { eager: false })
    @IsNotEmpty({ message: 'Supplier must be specified' })
    supplier: Account;

    @ManyToOne(() => Branch, (branch) => branch.id, { eager: false })
    @IsNotEmpty({ message: 'Branch must be specified' })
    branch: Branch;

    @Column({ type: 'enum', enum: PurchaseOrderStatus, default: PurchaseOrderStatus.DRAFT })
    @IsEnum(PurchaseOrderStatus, { message: 'Invalid status' })
    status: PurchaseOrderStatus;

    @Column({ type: 'timestamptz', nullable: true })
    expectedDeliveryDate: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;

    @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, { eager: true })
    purchaseOrderItems: PurchaseOrderItem[];
};