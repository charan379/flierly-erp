import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Product } from "./Product.entity";
import { IsNotEmpty, Length, Matches } from "class-validator";
import { SerializedProductStatus } from "@/constants/serializedProductStatus";

@Entity("serialized_products")
@Unique(["product", "serialNumber"])
export class SerializedProduct {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    @JoinColumn({ name: "product_id" })
    @IsNotEmpty({ message: 'Product must be specified' })
    product: Product;

    @Column({ type: 'varchar', length: 100, name: "serial_number" })
    @IsNotEmpty({ message: 'Serial number must not be empty.' })
    @Length(5, 30, { message: 'Serial number must be between 3 and 30 characters.' })
    @Matches(/^[A-Z0-9-]{5,30}$/, { message: "Serial number is not valid only capital letters, numbers and hyphens allowed." })
    serialNumber: string;

    @Column({
        type: "enum",
        enum: SerializedProductStatus,
        default: SerializedProductStatus.AVAILABLE
    })
    status: SerializedProductStatus;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}