import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Privilege } from './Privilege.entity';
import { Role } from './Role.entity';

@Entity('iam_users')
@Index('idx_username', ['username'])
@Index('idx_email', ['email'])
@Index('idx_mobile', ['mobile'])
export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Username is required.' })
    username: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'User email is required.' })
    @IsNotEmpty({ message: 'User email is required.' })
    email: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'User mobile number is required.' })
    mobile: string;

    @ManyToMany(() => Privilege, { lazy: true })
    @JoinTable({
        name: 'iam_user_additional_privileges',
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

    @ManyToMany(() => Privilege, { lazy: true })
    @JoinTable({
        name: 'iam_user_restricted_privileges',
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

    @ManyToMany(() => Role, { lazy: true })
    @JoinTable({
        name: 'iam_user_roles',
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
