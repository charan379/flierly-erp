import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});
import 'reflect-metadata';
import './lib/di-ioc-container';
import DatabaseServiceImpl from '@/lib/database/database-service/DatabaseServiceImpl';
import dotenv from 'dotenv';
import generateSuperAdmin from './setup/generate-super-admin';
import generatePrivileges from './setup/generate-privileges';
import validateEnv from './lib/env-validator';
import DatabaseService from './lib/database/database-service/DatabaseService';
import BeanTypes from './lib/di-ioc-container/bean.types';
import iocContainer from './lib/di-ioc-container';

dotenv.config();

// validate environment variables
validateEnv();

async function setup(): Promise<void> {
  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);
  try {
    // const databaseService: DatabaseService = iocContainer.get<BeanTypes>();
    console.log('⚙️  [Setup]: Starting Flierly application setup...');
    // Establish Database
    await databaseService.connect();

    // Generate Permissions
    await generatePrivileges();

    // Generate Super Admin
    await generateSuperAdmin();
  } catch (error) {
    console.error('⚙️ 🔴 [Setup]: Flierly application setup failed: ', error);
    console.log(error);
  } finally {
    await databaseService.disconnect();
  }
}

setup();
