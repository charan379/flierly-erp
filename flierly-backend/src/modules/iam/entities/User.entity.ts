import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, Length, Matches, IsInt, IsBoolean, IsOptional } from 'class-validator';
import Privilege from './Privilege.entity';
import Role from './Role.entity';
import { Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('users')
@Index('idx_username', ['username'])
@Index('idx_email', ['email'])
@Index('idx_mobile', ['mobile'])
export default class User {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean = true;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(5, 20) // Min 5, Max 20 characters
  @Matches(/^[a-z0-9_]+$/) // Alphanumeric + underscore
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/)
  mobile: string;

  @ManyToMany(() => Privilege, (privilege) => privilege.usersWithAdditionalPrivileges)
  @JoinTable({
    name: 'user_additional_privileges',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'privilege_id',
      referencedColumnName: 'id',
    },
  })
  additionalPrivileges?: Privilege[];

  @ManyToMany(() => Privilege, (privilege) => privilege.usersWithRestrictedPrivileges)
  @JoinTable({
    name: 'user_restricted_privileges',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'privilege_id',
      referencedColumnName: 'id',
    },
  })
  restrictedPrivileges?: Privilege[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
