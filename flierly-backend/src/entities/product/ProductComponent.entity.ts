import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity({ name: "product_components" })
export class ProductComponent {

    @PrimaryColumn({ name: "composite_product_id", type: "bigint" })
    compositeProductId: number;

    @PrimaryColumn({ name: "component_product_id", type: "bigint" })
    componentProductId: number;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    @JoinColumn({ name: "composite_product_id" })
    compositeProduct: Product;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    @JoinColumn({ name: "component_product_id" })
    componentProduct: Product;
}