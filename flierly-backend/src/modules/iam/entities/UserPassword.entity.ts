import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('user_passwords')
export default class UserPassword {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true, name: "user_id" })
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
