import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});
import 'reflect-metadata';
import './lib/di-ioc-container';
import dotenv from 'dotenv';
import generateSuperAdmin from './setup/generate-super-admin';
import generatePrivileges from './setup/generate-privileges';
import validateEnv from './lib/env-validator';
import DatabaseService from './lib/database/database-service/DatabaseService';
import BeanTypes from './lib/di-ioc-container/bean.types';
import iocContainer from './lib/di-ioc-container';
import LoggerService from './modules/core/services/logger-service/LoggerService';

dotenv.config();

// validate environment variables
validateEnv();

async function setup(): Promise<void> {
  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);
  // get logger service instance from ioc container
  const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
  const loggerMeta = { service: "Setup" };
  try {
    logger.info('⚙️ Starting Flierly application setup...', loggerMeta);
    // Establish Database
    await databaseService.connect();

    // Generate Permissions
    await generatePrivileges();

    // Generate Super Admin
    await generateSuperAdmin();
  } catch (error) {
    logger.error('⚙️ 🔴 Flierly application setup failed: ', { ...loggerMeta, error: JSON.stringify(error) });
    logger.debug(`⚙️ 🔴 Flierly application setup failed: ${JSON.stringify(error)}`, { ...loggerMeta, error: JSON.stringify(error) });
    process.exit(1);
  } finally {
    await databaseService.disconnect();
  }
}

setup();
