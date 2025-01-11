import { DataSource, Repository, QueryRunner } from 'typeorm';
import DatabaseServiceImpl from '../database-service/DatabaseServiceImpl';

// Mock the DataSource and its methods
jest.mock('typeorm', () => ({
    DataSource: jest.fn().mockImplementation(() => ({
        initialize: jest.fn(),
        isInitialized: false,
        destroy: jest.fn(),
        getRepository: jest.fn(),
        createQueryRunner: jest.fn(),
        transaction: jest.fn(),
        query: jest.fn(),
    })),
    Repository: jest.fn(),
    QueryRunner: jest.fn(),
    EntityManager: jest.fn(),
    SelectQueryBuilder: jest.fn(),
}));

describe('DatabaseServiceImpl', () => {
    let databaseService: DatabaseServiceImpl;
    let mockDataSource: jest.Mocked<DataSource>;

    beforeEach(() => {
        // Create a new instance of the service
        databaseService = new DatabaseServiceImpl();

        // Mock the DataSource instance
        mockDataSource = databaseService['dataSource'] as jest.Mocked<DataSource>;

        Object.defineProperty(mockDataSource, 'isInitialized', {
            value: false,
            writable: true,  // Mark it as writable temporarily
            configurable: true,  // Allow further modification
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('connect', () => {
        it('should establish a database connection successfully', async () => {
            // Mock the initialize method to resolve
            mockDataSource.initialize.mockResolvedValue(mockDataSource);

            // Mock isInitialized to return true after initialization
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: true,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });
            await databaseService.connect();

            expect(mockDataSource.initialize).toHaveBeenCalled();
            expect(mockDataSource.isInitialized).toBe(true);
        });
    });

    describe('disconnect', () => {
        it('should destroy the database connection successfully', async () => {
            // Mock isInitialized to return true
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: true,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });
            mockDataSource.destroy.mockResolvedValue(undefined);

            await databaseService.disconnect();

            expect(mockDataSource.destroy).toHaveBeenCalled();
        });

        it('should log a message if the database is not initialized', async () => {
            // Mock isInitialized to return false
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });
            mockDataSource.destroy.mockResolvedValue(undefined);

            await databaseService.disconnect();

            expect(mockDataSource.destroy).not.toHaveBeenCalled();
        });
    });

    describe('getRepository', () => {
        it('should return a repository when the database is initialized', () => {
            // Mock isInitialized to return true
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: true,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            const mockRepository = {} as Repository<{}>;
            mockDataSource.getRepository.mockReturnValue(mockRepository);

            const repository = databaseService.getRepository('TestEntity');

            expect(repository).toBe(mockRepository);
            expect(mockDataSource.getRepository).toHaveBeenCalledWith('TestEntity');
        });

        it('should throw an error if the database is not initialized', () => {
            // Mock isInitialized to return false
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            expect(() => databaseService.getRepository('TestEntity')).toThrow(
                '🛢 [Database]: Database connection is not initialized.'
            );
        });
    });

    describe('getQueryRunner', () => {
        it('should return a query runner when the database is initialized', () => {
            // Mock isInitialized to return true
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: true,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            const mockQueryRunner = {} as QueryRunner;
            mockDataSource.createQueryRunner.mockReturnValue(mockQueryRunner);

            const queryRunner = databaseService.getQueryRunner();

            expect(queryRunner).toBe(mockQueryRunner);
            expect(mockDataSource.createQueryRunner).toHaveBeenCalled();
        });

        it('should throw an error if the database is not initialized', () => {
            // Mock isInitialized to return false
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });
            expect(() => databaseService.getQueryRunner()).toThrow(
                '🛢 [Database]: Database connection is not initialized.'
            );
        });
    });

    describe('executeTransaction', () => {
        it('should throw an error if the database is not initialized', async () => {
            // Mock isInitialized to return false
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            await expect(databaseService.executeTransaction(jest.fn())).rejects.toThrow(
                '🛢 [Database]: Database connection is not initialized.'
            );
        });
    });

    describe('getQueryBuilder', () => {
        it('should throw an error if the database is not initialized', () => {
            // Mock isInitialized to return fase
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            expect(() => databaseService.getQueryBuilder('TestEntity', 'testAlias')).toThrow(
                '🛢 [Database]: Database connection is not initialized.'
            );
        });
    });

    describe('executeRawQuery', () => {
        it('should execute a raw query successfully', async () => {
            // Mock isInitialized to return true
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: true,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });

            const mockQuery = 'SELECT * FROM test';
            const mockResult = [{ id: 1, name: 'Test' }];
            mockDataSource.query.mockResolvedValue(mockResult);

            const result = await databaseService.executeRawQuery(mockQuery);

            expect(result).toBe(mockResult);
            expect(mockDataSource.query).toHaveBeenCalledWith(mockQuery, undefined);
        });

        it('should throw an error if the database is not initialized', async () => {
            // Mock isInitialized to return false
            Object.defineProperty(mockDataSource, 'isInitialized', {
                value: false,
                writable: true,  // Mark it as writable temporarily
                configurable: true,  // Allow further modification
            });
            await expect(databaseService.executeRawQuery('SELECT * FROM test')).rejects.toThrow(
                '🛢 [Database]: Database connection is not initialized.'
            );
        });
    });
});