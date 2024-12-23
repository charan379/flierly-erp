import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('iam_user_passwords')
export class UserPassword {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'UserId is required for storing passwords' })
  userId: number;

  @Column()
  @IsNotEmpty({ message: 'User password is required.' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
