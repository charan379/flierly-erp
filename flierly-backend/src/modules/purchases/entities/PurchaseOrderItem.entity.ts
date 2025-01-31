import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import PurchaseOrder from './PurchaseOrder.entity';
import Product from '@/modules/product/entities/Product.entity';

@Entity('purchase_order_items')
export default class PurchaseOrderItem {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.purchaseOrderItems, { eager: false })
    @JoinColumn({ name: 'order_id' })
    @IsNotEmpty({ message: 'Purchase Order must be specified.' })
    purchaseOrder: PurchaseOrder;

    @ManyToOne(() => Product, { eager: true })  // Linking to Product entity
    @JoinColumn({ name: 'product_id' })
    @IsNotEmpty({ message: 'Product must be specified.' })
    product: Product;

    @Column({ type: 'int' })
    @IsNotEmpty({ message: 'Quantity must not be empty.' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNotEmpty({ message: 'Unit price must not be empty.' })
    unitPrice: number;

    @Column({ type: 'int', name: "received_quantity", nullable: true })
    received: boolean;

    @Column({ type: 'int', name: "defective_quantity", nullable: true })
    defective: boolean;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    remarks: string;

    @Column({ type: 'timestamptz', nullable: true })
    @IsOptional()
    expectedDeliveryDate: Date;
}
