import { IStorage } from './IStorage.inerface';
import { BlobServiceClient } from '@azure/storage-blob';
import EnvConfig from '@/config/env/env.config';
import { FileUpload } from '@/entities/storage/FileUpload.entity';
import { AppDataSource } from '@/lib/typeorm/app-datasource';

export class AzureBlobStorageService implements IStorage {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor () {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(EnvConfig.AZURE_STORAGE_CONNECTION_STRING);
    this.containerName = EnvConfig.AZURE_CONTAINER_NAME;
  }

  async uploadFile (file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(destinationPath);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    const fileUrl = blockBlobClient.url;

    // Save metadata to the database
    const fileRepository = AppDataSource.getRepository(FileUpload);
    const metadata = fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      storageBackend: 'azure',
      filePath: destinationPath,
    });

    await fileRepository.save(metadata);

    return { fileUrl, fileUpload: metadata };
  }

  async downloadFile (filePath: string): Promise<Buffer> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(filePath);
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    return Buffer.from(await streamToBuffer(downloadBlockBlobResponse.readableStreamBody!));
  }

  getFileUrl (destinationPath: string): string {
    return `https://${this.blobServiceClient.accountName}.blob.core.windows.net/${this.containerName}/${destinationPath}`;
  }

  async deleteFile (destinationPath: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(destinationPath);
    await blockBlobClient.delete();
  }
}

async function streamToBuffer (readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}
