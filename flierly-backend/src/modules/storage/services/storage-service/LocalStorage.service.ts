import path from 'path';
import fs from 'fs';
import { IStorage } from './IStorage.inerface';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '@/modules/storage/entities/FileUpload.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';

export class LocalStorageService implements IStorage {
  private storagePath: string;

  constructor () {
    this.storagePath = path.join(__dirname, '../../../uploads');
  }

  async uploadFile (file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    // Generate a unique file name
    const uniqueName = `${uuidv4()}-${file.originalname}`;

    const filePath = path.join(this.storagePath, destinationPath, uniqueName);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, file.buffer);

    const fileUrl = `/uploads/${destinationPath}/${uniqueName}`;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'local',
      filePath: fileUrl,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile (filePath: string): Promise<Buffer> {
    const fullPath = path.join(this.storagePath, filePath);
    return fs.promises.readFile(fullPath);
  }

  getFileUrl (destinationPath: string): string {
    return `/uploads/${destinationPath}`;
  }

  async deleteFile (destinationPath: string): Promise<void> {
    const filePath = path.join(this.storagePath, destinationPath);
    await fs.promises.unlink(filePath);
  }
}
