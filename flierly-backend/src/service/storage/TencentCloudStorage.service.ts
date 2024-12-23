import { IStorage } from './IStorage.inerface';
import COS from 'cos-nodejs-sdk-v5';
import { FileUpload } from '@/entities/storage/FileUpload.entity';
import { AppDataSource } from '@/lib/typeorm/app-datasource';

export class TencentCloudStorageService implements IStorage {
  private cos: COS;
  private bucketName: string;
  private region: string;

  constructor() {
    this.cos = new COS({
      SecretId: process.env.TENCENT_CLOUD_SECRET_ID,
      SecretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
    });
    this.bucketName = process.env.TENCENT_CLOUD_BUCKET_NAME || 'flierly';
    this.region = process.env.TENCENT_CLOUD_REGION || 'ap-guangzhou';
  }

  async uploadFile(file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    const params = {
      Bucket: this.bucketName,
      Region: this.region,
      Key: destinationPath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const result = await this.cos.putObject(params);
    const fileUrl = `https://${params.Bucket}.cos.${params.Region}.myqcloud.com/${params.Key}`;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'tencent',
      filePath: destinationPath,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucketName,
      Region: this.region,
      Key: filePath,
    };
    const response = await this.cos.getObject(params);
    if (!response.Body) {
      throw new Error('File not found');
    }
    return response.Body as Buffer;
  }

  getFileUrl(destinationPath: string): string {
    return `https://${this.bucketName}.cos.${this.region}.myqcloud.com/${destinationPath}`;
  }

  async deleteFile(destinationPath: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Region: this.region,
      Key: destinationPath,
    };
    await this.cos.deleteObject(params);
  }
}
