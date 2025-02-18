import { cleanEnv, port, str, url, bool, num } from 'envalid';
import { urlArray } from './custom-validators';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    HTTPS: bool(),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_SCHEMA: str(),
    JWT_SECRET: str(),
    DOMAIN_NAME: url(),
    CORS_ORIGINS: urlArray(),
    // Storage configuration
    // STORAGE_TYPE: str({ choices: ["awsS3", "azure", "backBlaze", "digitalOcean", "gcp", "tencent", "local"] }),
    // S3_ACCESS_KEY: str(),
    // S3_SECRET_KEY: str(),
    // S3_REGION: str(),
    // S3_BUCKET_NAME: str(),
    // GCP_BUCKET_NAME: str(),
    // AZURE_STORAGE_CONNECTION_STRING: str(),
    // AZURE_CONTAINER_NAME: str(),
    // DO_SPACES_ENDPOINT: str(),
    // DO_SPACES_KEY: str(),
    // DO_SPACES_SECRET: str(),
    // DO_SPACES_BUCKET_NAME: str(),
    // B2_APPLICATION_KEY_ID: str(),
    // B2_APPLICATION_KEY: str(),
    // B2_BUCKET_ID: str(),
    // TENCENT_CLOUD_SECRET_ID: str(),
    // TENCENT_CLOUD_SECRET_KEY: str(),
    // TENCENT_CLOUD_BUCKET_NAME: str(),
    // TENCENT_CLOUD_REGION: str(),
  });
};

export default validateEnv;
