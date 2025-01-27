import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('brands')
export default class Brand {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @IsInt({ message: 'Brand ID must be an integer.' })
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 90, { message: 'Name must be between 3 and 90 characters.' })
  name: string;

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
