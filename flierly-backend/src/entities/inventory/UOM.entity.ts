import { IsNotEmpty, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('uom')
export class UOM {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters.' })
  name: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
  
  @Column({ type: 'varchar', length: 50, unique: true })
  @IsNotEmpty({ message: 'Short Name must not be empty.' })
  @Length(1, 50, { message: 'Short Name must be between 1 and 50 characters.' })
  shortName: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  @IsNotEmpty({ message: 'Code must not be empty.' })
  @Length(2, 10, { message: 'Code must be between 2 and 10 characters.' })
  code: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
