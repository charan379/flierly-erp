import HttpCodes from "@/constants/httpCodes";
import FlierlyException from "./flierly.exception";
import mongoose from "mongoose";
import Config from "@/config";

class Database {
    public static async connect(): Promise<void> {
        console.log("🍃 [MongoDB]: waiting for MongoDB Connection to be established... ");

        const connectionUri: string | undefined = Config.MONGODB_SERVER_STRING;

        // throw error if connection string is undefined
        if (connectionUri === undefined) {
            throw new FlierlyException("🍂 [MongoDB]: Connection String is invalid or missing", HttpCodes.INTERNAL_SERVER_ERROR, "", "");
        };

        mongoose.set('autoCreate', true);
        mongoose.set('strictQuery', false);

        // establish database connection
        try {
            await mongoose.connect(connectionUri, { serverSelectionTimeoutMS: 5000 });
            console.info("🍃 [MongoDB]: MongoDB initial connection established successfully");
            // Handle initial connection errors
        } catch (error) {
            console.error("🍂 [MongoDB]: Initial connection error : ", error);
            process.exit(1);
        }

        // get database connection
        const dbConnection = mongoose.connection;

        // If there is problem establishing db connection then
        dbConnection.on('error', (error) => {
            console.error.bind(console, "🍃 [MongoDB]: Connection Error : ", error);
        });

        // If mongodb connection established successfully
        dbConnection.once("open", () => {
            console.info("🍃 [MongoDB]: MongoDB connection established successfully");
        })
    };

    public static async disconnect() {
        // get database connection
        const dbConnection = mongoose.connection;

        if (dbConnection?.readyState === 1) {
            await mongoose.connection.destroy();
            console.info("🍂 [MongoDB]: MongoDB connection destroyed successfully");
        }
    }
};

export default Database;