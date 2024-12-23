import { IStorage } from './IStorage.inerface';
import AWS from 'aws-sdk';
import EnvConfig from '@/config/env/env.config';
import { FileUpload } from '@/entities/storage/FileUpload.entity';
import { AppDataSource } from '@/lib/typeorm/app-datasource';

export class DigitalOceanSpacesService implements IStorage {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: new AWS.Endpoint(EnvConfig.DO_SPACES_ENDPOINT),
      accessKeyId: EnvConfig.DO_SPACES_KEY,
      secretAccessKey: EnvConfig.DO_SPACES_SECRET,
    });
    this.bucketName = EnvConfig.DO_SPACES_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    const params = {
      Bucket: this.bucketName,
      Key: destinationPath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const result = await this.s3.upload(params).promise();
    const fileUrl = result.Location;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'digitalOcean',
      filePath: destinationPath,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile(filePath: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    const response = await this.s3.getObject(params).promise();
    if (!response.Body) {
      throw new Error('File not found');
    }
    return response.Body as Buffer;
  }

  getFileUrl(destinationPath: string): string {
    return `https://${this.bucketName}.${this.s3.config.endpoint}/${destinationPath}`;
  }

  async deleteFile(destinationPath: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: destinationPath,
    };
    await this.s3.deleteObject(params).promise();
  }
}
