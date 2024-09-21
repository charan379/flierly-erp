import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
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
    name: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Role code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Role description is required.' })
    description: string;

    @ManyToMany(() => Privilege, { lazy: true })
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

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
