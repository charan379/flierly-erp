import { Entity, PrimaryGeneratedColumn, Column, Index, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import AccessType from '@/constants/accessTypes';

@Entity('iam_privileges')
@Index('idx_entity', ['entity'])
export class Privilege {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;
    
    @Column({ unique: true })
    @IsNotEmpty({ message: 'Privilege name is required.' })
    name: string;

    @Column({
        type: 'enum',
        enum: AccessType
    })
    @IsNotEmpty({ message: 'Access type is required.' })
    access: AccessType;

    @Column()
    @IsNotEmpty({ message: 'Entity name is required.' })
    entity: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Privilege code is required.' })
    code: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}
