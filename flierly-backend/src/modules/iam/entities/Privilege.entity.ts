import { Entity, PrimaryGeneratedColumn, Column, Index, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import AccessType from '../constants/access-types.enum';
import Role from './Role.entity';
import User from './User.entity';
import { Expose, Type } from 'class-transformer';
import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';

@Entity('privileges')
@Index('idx_entity', ['entity'])
@Expose()
@Index('idx_entity_access', ['entity', 'access'], { unique: false }) // Index on 'entity' and 'access'
export default class Privilege {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
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

  @Column({
    type: 'enum',
    enum: AccessType,
  })
  @IsEnum(AccessType)
  @IsNotEmpty()
  access: AccessType;

  @Column()
  @IsNotEmpty()
  @Length(3, 20) // Min 3, Max 20
  entity: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(5, 25) // Min 5, Max 25
  @Matches(/^[a-z-]+\.[a-z-]+$/) // Regex pattern
  code: string;

  @ManyToMany(() => Role, (role) => role.privileges)
  roles?: Role[];

  @ManyToMany(() => User, (user) => user.additionalPrivileges)
  usersWithAdditionalPrivileges?: User[];

  @ManyToMany(() => User, (user) => user.restrictedPrivileges)
  usersWithRestrictedPrivileges?: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
