import { EntityTarget, ObjectLiteral, Repository, QueryRunner, EntityManager, SelectQueryBuilder } from 'typeorm';

interface DatabaseService {
    /**
     * Establish a connection to the database.
     * @returns A promise that resolves when the connection is successfully established.
     */
    connect(): Promise<void>;

    /**
     * Disconnect from the database and clean up resources.
     * @returns A promise that resolves when the connection is successfully destroyed.
     */
    disconnect(): Promise<void>;

    /**
     * Get a TypeORM repository for the given entity.
     * @param entity - The target entity for which to get the repository.
     * @returns A repository instance for the provided entity.
     */
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T>;

    /**
     * Get a query runner for advanced database operations.
     * Useful for managing database transactions.
     * @returns A QueryRunner instance.
     */
    getQueryRunner(): QueryRunner;

    /**
     * Execute a transaction with the provided callback.
     * The callback receives an EntityManager to perform operations within the transaction.
     * @param transactionFn - The function to execute within the transaction.
     * @returns A promise that resolves with the result of the transaction function.
     */
    executeTransaction<T>(transactionFn: (manager: EntityManager) => Promise<T>): Promise<T>;

    /**
     * Get a SelectQueryBuilder for the specified entity.
     * Useful for building complex queries dynamically.
     * @param entity - The target entity for which to get the query builder.
     * @param alias - The alias to use for the entity in the query.
     * @returns A SelectQueryBuilder instance.
     */
    getQueryBuilder<T extends ObjectLiteral>(entity: EntityTarget<T>, alias: string): SelectQueryBuilder<T>;

    /**
     * Run a raw SQL query and return the results.
     * @param query - The raw SQL query to execute.
     * @param parameters - Optional parameters to bind to the query.
     * @returns The results of the query.
     */
    executeRawQuery<T>(query: string, parameters?: any[]): Promise<T>;

    createEntityManager(): EntityManager
}

export default DatabaseService;
