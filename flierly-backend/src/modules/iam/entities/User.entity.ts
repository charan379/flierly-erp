import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';
import Privilege from './Privilege.entity';
import Role from './Role.entity';

@Entity('users')
@Index('idx_username', ['username'])
@Index('idx_email', ['email'])
@Index('idx_mobile', ['mobile'])
export default class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Username is required.' })
  @Length(5, 20, { message: 'Username must be between 5 and 20 characters.' }) // Min 5, Max 20 characters
  @Matches(/^[a-z0-9_]+$/, { message: 'Username can only contain small case letters, numbers, and underscores.' }) // Alphanumeric + underscore
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty({ message: 'User email is required.' })
  email: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'User mobile number is required.' })
  @Matches(/^\+\d{1,3}[\s][6-9]\d{9}$/, { message: 'Mobile number is not valid' })
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
  additionalPrivileges: Privilege[];

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
  restrictedPrivileges: Privilege[];

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
  roles: Role[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
