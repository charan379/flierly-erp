import { AwsS3StorageService } from "./AwsS3StorageService";
import { IStorageService } from "./IStorageService";
import { LocalStorageService } from "./LocalStorageService";
import { AzureBlobStorageService } from "./AzureBlobStorageService";
import { BackblazeB2StorageService } from "./BackblazeB2StorageService";
import { DigitalOceanSpacesService } from "./DigitalOceanSpacesService";
import { GcpStorageService } from "./GcpStorageService";
import { TencentCloudStorageService } from "./TencentCloudStorageService";
import EnvConfig from "../../config/env/envConfig";

const storageType = EnvConfig.STORAGE_TYPE;

let storageService: IStorageService;

switch (storageType) {
    case "awsS3":
        storageService = new AwsS3StorageService();
        break;
    case "azure":
        storageService = new AzureBlobStorageService();
        break;
    case "backBlaze":
        storageService = new BackblazeB2StorageService();
        break;
    case "digitalOcean":
        storageService = new DigitalOceanSpacesService();
        break;
    case "gcp":
        storageService = new GcpStorageService();
        break;
    case "tencent":
        storageService = new TencentCloudStorageService();
        break;
    case "local":
    default:
        storageService = new LocalStorageService();
        break;
}

export default storageService;
