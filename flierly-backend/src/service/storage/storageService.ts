import { AwsS3StorageService } from './AwsS3Storage.service';
import { IStorage } from './IStorage.inerface';
import { LocalStorageService } from './LocalStorage.service';
import { AzureBlobStorageService } from './AzureBlobStorage.service';
import { BackblazeB2StorageService } from './BackblazeB2Storage.service';
import { DigitalOceanSpacesService } from './DigitalOceanSpaces.service';
import { GcpStorageService } from './GcpStorage.service';
import { TencentCloudStorageService } from './TencentCloudStorage.service';
import EnvConfig from '@/config/env/env.config';

// Get the storage type from environment configuration
const storageType = EnvConfig.STORAGE_TYPE;

let storageService: IStorage;

// Initialize the appropriate storage service based on the storage type
switch (storageType) {
  case 'awsS3':
    storageService = new AwsS3StorageService();
    break;
  case 'azure':
    storageService = new AzureBlobStorageService();
    break;
  case 'backBlaze':
    storageService = new BackblazeB2StorageService();
    break;
  case 'digitalOcean':
    storageService = new DigitalOceanSpacesService();
    break;
  case 'gcp':
    storageService = new GcpStorageService();
    break;
  case 'tencent':
    storageService = new TencentCloudStorageService();
    break;
  case 'local':
  default:
    storageService = new LocalStorageService();
    break;
}

export default storageService;
