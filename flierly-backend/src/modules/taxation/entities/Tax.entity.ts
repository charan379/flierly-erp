import Product from '@/modules/inventory/entities/Product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany } from 'typeorm';

@Entity('tax_rates')
export default class TaxRate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 100 })
    name: string; // Example: GST, VAT, Sales Tax

    @Column({ name: 'rate', type: 'decimal', precision: 4, scale: 2 })
    rate: number; // Example: 18.00 for 18%

    @Column({ name: 'is_inclusive', type: 'boolean', default: false })
    isInclusive: boolean; // Indicates if the tax is included in the price

    @ManyToMany(() => Product, (product) => product.taxeRates)
    products: Product[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
