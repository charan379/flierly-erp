import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Privilege } from './Privilege.entity';

@Entity('iam_roles')
export class Role {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Role name is required.' })
    name: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Role code is required.' })
    code: string;

    @Column()
    @IsNotEmpty({ message: 'Role description is required.' })
    description: string;

    @ManyToMany(() => Privilege)
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
