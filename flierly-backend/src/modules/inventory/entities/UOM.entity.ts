import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('uoms')
export default class UOM {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'Name must not be empty.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters.' })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false, name: "short_name" })
  @IsNotEmpty({ message: 'Short Name must not be empty.' })
  @Length(1, 10, { message: 'Short Name must be between 1 and 10 characters.' })
  @Matches(/^[a-zA-Z0-9]{1,10}$/, { message: 'Short Name is not valid only letters, numbers allowed.' })
  shortName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
