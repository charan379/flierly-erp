import { NumericTransformer } from '@/lib/database/typeorm/utils/NumericTransformer';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm';

@Entity('file_uploads')
export default class FileUpload {
  @PrimaryColumn({ type: 'bigint', transformer: NumericTransformer, generated: true, update: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id: number;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column()
  size: number;

  @Column({ name: 'storage_backend' })
  storageBackend: string;

  @Column({ name: 'file_path' })
  filePath: string;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamptz' })
  uploadedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;
}
