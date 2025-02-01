import { inject, injectable } from 'inversify';
import { AppDataSource } from '../typeorm/app-datasource';
import {
  EntityTarget,
  ObjectLiteral,
  Repository,
  QueryRunner,
  EntityManager,
  SelectQueryBuilder,
  DataSource,
} from 'typeorm';
import DatabaseService from './DatabaseService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';

@injectable()
class DatabaseServiceImpl implements DatabaseService {

  private readonly dataSource: DataSource;
  private loggerMeta = { service: 'DatabaseService' };

  constructor(
    @inject(BeanTypes.LoggerService) private readonly logger: LoggerService,
  ) {
    this.dataSource = AppDataSource;
  }

  public async connect(): Promise<void> {
    this.logger.info('🛢 Establishing Database connection...', this.loggerMeta);

    try {
      await this.dataSource.initialize();

      if (this.dataSource.isInitialized) {
        this.logger.info('🛢 Database connection established successfully.', this.loggerMeta);
      }

    } catch (error) {
      this.logger.error('🛢 Failed to establish database connection.', { error, ...this.loggerMeta });
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      this.logger.info('🛢 Disconnecting database connection.', this.loggerMeta);

      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
        this.logger.info('🛢 Database connection destroyed successfully.', this.loggerMeta);
      } else {
        this.logger.warn('🛢 Database connection is not initialized.', this.loggerMeta);
      }
    } catch (error) {
      this.logger.error('🛢 Failed to destroy database connection.', { error, ...this.loggerMeta });
      throw error;
    }
  }

  public getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    return this.dataSource.getRepository<T>(entity);
  }

  public getQueryRunner(): QueryRunner {
    return this.dataSource.createQueryRunner();
  }

  public async executeTransaction<T>(transactionFn: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (manager) => {
      return transactionFn(manager);
    });
  }

  public getQueryBuilder<T extends ObjectLiteral>(entity: EntityTarget<T>, alias: string): SelectQueryBuilder<T> {
    return this.dataSource.getRepository(entity).createQueryBuilder(alias);
  }

  public async executeRawQuery<T>(query: string, parameters?: any[]): Promise<T> {
    return this.dataSource.query(query, parameters);
  }
}

export default DatabaseServiceImpl;
