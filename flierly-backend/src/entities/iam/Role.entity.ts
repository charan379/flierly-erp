import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Privilege } from './Privilege.entity';

@Entity('iam_roles')
export class Role {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Role name is required.' })
    @Length(5, 30, { message: 'Role name must be between 5 and 30 characters.' })  // Min 5, Max 30
    name: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Role code is required.' })
    @Length(5, 25, { message: 'Role code must be between 4 and 25 characters.' })  // Min 5, Max 25
    @Matches(/^[a-z]+\-[a-z0-9]+$/, { message: 'Role code must match the pattern /^[a-z]+\-[a-z0-9]+$/.' })  // Regex pattern
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Role description is required.' })
    @Length(10, 350, { message: 'Role description must be between 10 and 350 characters.' })  // Min 10, Max 350
    description: string;

    @ManyToMany(() => Privilege, {})
    @JoinTable({
        name: 'iam_role_privileges',
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

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
