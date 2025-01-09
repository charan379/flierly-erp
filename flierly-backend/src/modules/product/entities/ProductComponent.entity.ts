import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import Product from './Product.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'product_components' })
export default class ProductComponent {
  @PrimaryColumn({ name: 'composite_product_id', type: 'bigint' })
  compositeProductId: number;

  @PrimaryColumn({ name: 'component_product_id', type: 'bigint' })
  componentProductId: number;

  @ManyToOne(() => Product, { eager: false, nullable: false })
  @JoinColumn({ name: 'composite_product_id' })
  @IsNotEmpty({ message: 'CompositeProduct must be specified' })
  compositeProduct: Product;

  @ManyToOne(() => Product, { eager: false, nullable: false })
  @JoinColumn({ name: 'component_product_id' })
  @IsNotEmpty({ message: 'ComponentProduct must be specified' })
  componentProduct: Product;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
