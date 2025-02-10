import { promises as fs } from 'fs';
import path from 'path';
import { getCache, setCache } from '../../cache';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';
import iocContainer from '@/lib/di-ioc-container';
import DatabaseService from '../database-service/DatabaseService';

/**
 * Executes a SQL query from a file with the given parameters.
 * @param relativeFilePath - The relative path to the SQL file.
 * @param params - The parameters to pass to the query.
 * @param cacheDuration - The duration to cache the query result (default: 60000 ms).
 * @returns A promise that resolves to the query result.
 */
async function executeQueryFromFile<T>(relativeFilePath: string, params: any[], cacheDuration: number = 60000): Promise<T> {

  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

  const queryRunner = databaseService.getQueryRunner();
  // get logger service instance from ioc container
  const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
  const loggerMeta = { service: "QueryExecutor" };
  try {
    const cacheKey = `${relativeFilePath}:${JSON.stringify(params)}`;

    // Check if the cached result is still valid
    const cachedResult = await getCache<T>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    await queryRunner.connect(); // Establish connection
    await queryRunner.query(`SET search_path TO "dev"`);

    // Load SQL query from file asynchronously
    const query = await getQueryFromCacheOrFile(relativeFilePath, cacheDuration);

    // Execute the query with parameters
    const result = await queryRunner.query(query, params);

    // Cache the result with an expiry time
    await setCache(cacheKey, result, cacheDuration);

    return result as T;
  } catch (error) {
    logger.debug('Error executing query:', { ...loggerMeta, error: JSON.stringify(error) });
    throw error;
  } finally {
    await queryRunner.release()
  }
}

/**
 * Retrieves the SQL query from cache or file.
 * @param relativeFilePath - The relative path to the SQL file.
 * @param cacheDuration - The duration to cache the query (default: 60000 ms).
 * @returns A promise that resolves to the SQL query string.
 */
async function getQueryFromCacheOrFile(relativeFilePath: string, cacheDuration: number): Promise<string> {
  const queryCacheKey = `query:${relativeFilePath}`;
  const cachedQuery = await getCache<string>(queryCacheKey);

  if (cachedQuery) {
    return cachedQuery;
  }

  const fullPath = path.join(__dirname, '../../../', relativeFilePath);
  const query = await fs.readFile(fullPath, 'utf8');
  await setCache(queryCacheKey, query, cacheDuration);

  return query;
}

export default executeQueryFromFile;
