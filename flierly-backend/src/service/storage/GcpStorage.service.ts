import { IStorage } from './IStorage.inerface';
import { Storage } from '@google-cloud/storage';
import EnvConfig from '@/config/env/env.config';
import { FileUpload } from '@/entities/storage/FileUpload.entity';
import { AppDataSource } from '@/lib/typeorm/app-datasource';

export class GcpStorageService implements IStorage {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage();
    this.bucketName = EnvConfig.GCP_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(destinationPath);
    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    stream.end(file.buffer);

    const fileUrl = `https://storage.googleapis.com/${this.bucketName}/${destinationPath}`;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'gcp',
      filePath: destinationPath,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(filePath);
    const [contents] = await blob.download();
    return contents;
  }

  getFileUrl(destinationPath: string): string {
    return `https://storage.googleapis.com/${this.bucketName}/${destinationPath}`;
  }

  async deleteFile(destinationPath: string): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(destinationPath);
    await blob.delete();
  }
}
