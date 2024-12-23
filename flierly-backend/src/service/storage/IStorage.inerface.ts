import { FileUpload } from '@/entities/storage/FileUpload.entity';

export interface IStorage {
  /**
   * Uploads a file to the specified destination path.
   * @param file - The file to upload.
   * @param destinationPath - The destination path where the file will be stored.
   * @returns A promise that resolves with the file URL and the FileUpload entity.
   */
  uploadFile(file: Express.Multer.File, destinationPath: string): Promise<{ fileUrl: string; fileUpload: FileUpload }>;

  /**
   * Downloads a file from the specified file path.
   * @param filePath - The path of the file to download.
   * @returns A promise that resolves with the file content as a Buffer.
   * @throws Will throw an error if the file cannot be downloaded.
   */
  downloadFile(filePath: string): Promise<Buffer>;

  /**
   * Gets the URL of a file stored at the specified destination path.
   * @param destinationPath - The path of the file.
   * @returns The URL of the file.
   */
  getFileUrl(destinationPath: string): string;

  /**
   * Deletes a file from the specified destination path.
   * @param destinationPath - The path of the file to delete.
   * @returns A promise that resolves when the file is deleted.
   */
  deleteFile(destinationPath: string): Promise<void>;
}
