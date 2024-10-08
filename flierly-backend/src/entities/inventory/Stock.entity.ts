import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { UOM } from './UOM.entity';

@Entity('stock')
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => UOM, { eager: true })
    @JoinColumn({ name: "uom_id" })
    uom: UOM;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;

}
