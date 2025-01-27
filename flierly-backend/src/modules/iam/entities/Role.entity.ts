import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Length, Matches } from 'class-validator';
import Privilege from './Privilege.entity';
import User from './User.entity';
import { Type } from 'class-transformer';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @Type(() => Number)
  @IsInt({ message: 'Role ID must be an integer.' })
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Role name is required.' })
  @Length(5, 30, { message: 'Role name must be between 5 and 30 characters.' }) // Min 5, Max 30
  name: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Role code is required.' })
  @Length(5, 25, { message: 'Role code must be between 4 and 25 characters.' }) // Min 5, Max 25
  @Matches(/^[a-z-]+\.[a-z-]+$/, { message: 'Role code must match the pattern /^[a-z-]+\.[a-z-]+$/.' }) // Regex pattern
  code: string;

  @Column()
  @IsNotEmpty({ message: 'Role description is required.' })
  @Length(10, 350, { message: 'Role description must be between 10 and 350 characters.' }) // Min 10, Max 350
  description: string;

  @ManyToMany(() => Privilege, (privilege) => privilege.roles)
  @JoinTable({
    name: 'role_privileges',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'privilege_id',
      referencedColumnName: 'id',
    },
  })
  privileges: Privilege[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
