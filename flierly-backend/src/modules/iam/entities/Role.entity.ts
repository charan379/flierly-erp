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
  @IsInt()
  @IsOptional()
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(5, 30) // Min 5, Max 30
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(5, 25,) // Min 5, Max 25
  @Matches(/^[a-z-]+\.[a-z-]+$/) // Regex pattern
  code: string;

  @Column()
  @IsNotEmpty()
  @Length(10, 350) // Min 10, Max 350
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
  privileges?: Privilege[];

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
