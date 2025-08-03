import { IStorage } from './IStorage.inerface';
import B2 from 'backblaze-b2';
import EnvConfig from '@/config/env/env.config';
import FileUpload from '@/modules/storage/entities/FileUpload.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';

export class BackblazeB2StorageService implements IStorage {
  private b2: B2;
  private bucketId: string;

  constructor () {
    this.b2 = new B2({
      applicationKeyId: EnvConfig.B2_APPLICATION_KEY_ID,
      applicationKey: EnvConfig.B2_APPLICATION_KEY,
    });
    this.bucketId = EnvConfig.B2_BUCKET_ID;
  }

  async uploadFile (file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    await this.b2.authorize();
    const response = await this.b2.getUploadUrl({ bucketId: this.bucketId });
    const uploadUrl = response.data.uploadUrl;
    const uploadAuthToken = response.data.authorizationToken;

    const _uploadResponse = await this.b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName: destinationPath,
      data: file.buffer,
    });

    const fileUrl = `https://f002.backblazeb2.com/file/${this.bucketId}/${destinationPath}`;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'backBlaze',
      filePath: destinationPath,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile (filePath: string): Promise<Buffer> {
    await this.b2.authorize();
    const response = await this.b2.downloadFileByName({
      bucketName: this.bucketId,
      fileName: filePath,
      responseType: 'arraybuffer',
    });

    return Buffer.from(response.data);
  }

  getFileUrl (destinationPath: string): string {
    return `https://f002.backblazeb2.com/file/${this.bucketId}/${destinationPath}`;
  }

  async deleteFile (destinationPath: string): Promise<void> {
    await this.b2.authorize();
    const fileInfo = await this.b2.getFileInfo({ fileId: destinationPath });
    await this.b2.deleteFileVersion({
      fileId: fileInfo.data.fileId,
      fileName: destinationPath,
    });
  }
}
