import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('user_passwords')
export default class UserPassword {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsInt({ message: 'User Password ID must be an integer.' })
  @Type(() => Number)
  id: number;

  @Column({ unique: true, name: "user_id" })
  @IsNotEmpty({ message: 'UserId is required for storing passwords' })
  @IsInt({ message: 'User ID must be an integer.' })
  @Type(() => Number)
  userId: number;

  @Column()
  @IsNotEmpty({ message: 'User password is required.' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
