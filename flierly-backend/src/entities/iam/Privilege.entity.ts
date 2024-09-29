import { Entity, PrimaryGeneratedColumn, Column, Index, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import AccessType from '@/constants/accessTypes';

@Entity('iam_privileges')
@Index('idx_entity', ['entity'])
@Index('idx_entity_access', ['entity', 'access'], { unique: false })  // Index on 'entity' and 'access'
export class Privilege {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Privilege name is required.' })
    @Length(5, 30, { message: 'Privilege name must be between 5 and 30 characters.' })  // Min 5, Max 30
    name: string;

    @Column({
        type: 'enum',
        enum: AccessType
    })
    @IsNotEmpty({ message: 'Access type is required.' })
    access: AccessType;

    @Column()
    @IsNotEmpty({ message: 'Entity name is required.' })
    @Length(3, 20, { message: 'Entity name must be between 3 and 20 characters.' })  // Min 3, Max 20
    entity: string;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Privilege code is required.' })
    @Length(5, 25, { message: 'Privilege code must be between 4 and 25 characters.' })  // Min 5, Max 25
    @Matches(/^[a-z-]+\.[a-z]+$/, { message: 'Privilege code must match the pattern /^[a-z-]+\\.[a-z]+$/.' })  // Regex pattern
    code: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date | null;
}