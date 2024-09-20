import { AppDataSource } from "./app-data-source";

class Database {
    public static async connect(): Promise<void> {
        console.log("🛢 [Database]: Establishing Database connection...");

        // establish database connection
        try {
            await AppDataSource.initialize();

            if (AppDataSource.isInitialized)
                console.info("🛢 [Database]: Database connection established successfully.");

            // Handle initial connection errors
        } catch (error) {
            console.error("🛢 [Database]: Failed to establish database connection: ", error);
            process.exit(1);
        }
    };

    public static async disconnect() {
        try {
            console.info("🛢 [Database]: Disconnecting database connection.");

            if (AppDataSource.isInitialized) {
                await AppDataSource.destroy();
                console.info("🛢 [Database]: Database connection destroyed successfully.");
            } else {
                console.info("🛢 [Database]: Database is not initialized.");
            }

        } catch (error) {
            console.error("🛢 [Database]: Failed to destroy database connection: ", error);
        }
    }
};

export default Database;