import { promises as fs } from 'fs';
import path from 'path';
import { AppDataSource } from '../app-data-source';
import { getCache, setCache } from '../cache';

async function executeQueryFromFile<T>(filePath: string, params: any[], cacheDuration: number= 60000): Promise<T> {
    try {
        const cacheKey = `${filePath}:${JSON.stringify(params)}`;

        // Check if the cached result is still valid
        const cachedResult = await getCache<T>(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }

        // Load SQL query from file asynchronously
        let query = await getQueryFromCacheOrFile(filePath, cacheDuration);

        // Execute the query with parameters
        const result = await AppDataSource.query(query, params);

        // Cache the result with an expiry time
        await setCache(cacheKey, result, cacheDuration);

        return result as T;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getQueryFromCacheOrFile(filePath: string, cacheDuration: number): Promise<string> {
    const queryCacheKey = `query:${filePath}`;
    const cachedQuery = await getCache<string>(queryCacheKey);

    if (cachedQuery) {
        return cachedQuery;
    }

    const query = await fs.readFile(path.resolve(__dirname, filePath), 'utf8');
    await setCache(queryCacheKey, query, cacheDuration);

    return query;
}

export default executeQueryFromFile;
