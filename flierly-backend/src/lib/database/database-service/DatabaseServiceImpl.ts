import { injectable } from 'inversify';
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

@injectable()
class DatabaseServiceImpl implements DatabaseService {

  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  public async connect(): Promise<void> {
    console.log('🛢 [Database]: Establishing Database connection...');

    try {
      await this.dataSource.initialize();

      if (this.dataSource.isInitialized) {
        console.info('🛢 [Database]: Database connection established successfully.');
      }

    } catch (error) {
      console.error('🛢 [Database]: Failed to establish database connection: ', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      console.info('🛢 [Database]: Disconnecting database connection.');

      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
        console.info('🛢 [Database]: Database connection destroyed successfully.');
      } else {
        console.info('🛢 [Database]: Database is not initialized.');
      }
    } catch (error) {
      console.error('🛢 [Database]: Failed to destroy database connection: ', error);
      throw error;
    }
  }

  public getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    // if (!this.dataSource.isInitialized) {
    //   throw new Error('🛢 [Database]: Database connection is not initialized.');
    // }
    return this.dataSource.getRepository<T>(entity);
  }

  public getQueryRunner(): QueryRunner {
    // if (!this.dataSource.isInitialized) {
    //   throw new Error('🛢 [Database]: Database connection is not initialized.');
    // }
    return this.dataSource.createQueryRunner();
  }

  public async executeTransaction<T>(transactionFn: (manager: EntityManager) => Promise<T>): Promise<T> {
    // if (!this.dataSource.isInitialized) {
    //   throw new Error('🛢 [Database]: Database connection is not initialized.');
    // }

    return this.dataSource.transaction(async (manager) => {
      return transactionFn(manager);
    });
  }

  public getQueryBuilder<T extends ObjectLiteral>(entity: EntityTarget<T>, alias: string): SelectQueryBuilder<T> {
    // if (!this.dataSource.isInitialized) {
    //   throw new Error('🛢 [Database]: Database connection is not initialized.');
    // }
    return this.dataSource.getRepository(entity).createQueryBuilder(alias);
  }

  public async executeRawQuery<T>(query: string, parameters?: any[]): Promise<T> {
    // if (!this.dataSource.isInitialized) {
    //   throw new Error('🛢 [Database]: Database connection is not initialized.');
    // }

    return this.dataSource.query(query, parameters);
  }
}

export default DatabaseServiceImpl;
