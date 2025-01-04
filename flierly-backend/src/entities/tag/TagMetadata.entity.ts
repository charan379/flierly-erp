import { TagDataType } from "@/constants/tag-datatype.enum";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('tags_metadata')
@Unique('uniqueNameAndEntity', ['name', 'entity'])
export class TagMetadata {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @IsNotEmpty({ message: 'Entity name is required.' })
    @Length(3, 20, { message: 'Entity name must be between 3 and 20 characters.' }) // Min 3, Max 20
    entity: string; // e.g., "Product", "Order", etc.

    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty({ message: 'Name must not be empty.' })
    @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
    name: string;

    @Column({
        type: "enum",
        enum: TagDataType,
    })
    @IsNotEmpty({ message: 'DataType must not be empty.' })
    datatype: TagDataType;

    @Column("jsonb", { nullable: true })
    options: { label: string; value: string, color: string }[]; // For ENUM types

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    @Length(20, 250, { message: 'Description must be between 20 and 250 characters.' })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}