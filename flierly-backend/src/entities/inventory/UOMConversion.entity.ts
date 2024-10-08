import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { UOM } from './UOM.entity';

@Entity('uom_conversions')
@Unique(['product', 'fromUom', 'toUom'])
export class UOMConversion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => UOM, { eager: true })
    @JoinColumn({ name: "from_uom_id" })
    fromUom: UOM;

    @ManyToOne(() => UOM, { eager: true })
    @JoinColumn({ name: "to_uom_id" })
    toUom: UOM;

    @Column({ type: 'decimal', precision: 10, scale: 4, name: "conversion_factor" })
    conversionFactor: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
