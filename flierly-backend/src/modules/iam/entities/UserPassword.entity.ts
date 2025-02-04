import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('user_passwords')
export default class UserPassword {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt()
  @Type(() => Number)
  id: number;

  @Column({ unique: true, name: "user_id" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;

  @Column()
  @IsNotEmpty()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
