import { EnvConfig } from '@/config/env';
import { DataSource } from 'typeorm';

const isProduction = EnvConfig.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvConfig.DB_HOST,
  port: EnvConfig.DB_PORT as number,
  username: EnvConfig.DB_USERNAME,
  password: EnvConfig.DB_PASSWORD,
  database: EnvConfig.DB_NAME,
  synchronize: true,
  schema: EnvConfig.DB_SCHEMA,
  logging: !isProduction,
  entities: isProduction ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*.{ts,js}'],
});