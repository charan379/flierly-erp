import Config from "@/config"
import { DataSource } from "typeorm"

const isProduction = Config.NODE_ENV === "production";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Config.DB_PORT as number,
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    synchronize: true,
    logging: !isProduction,
    entities: isProduction ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'],
    migrations: ["src/migration/**/*.{ts,js}"],
    subscribers: ["src/subscriber/**/*.{ts,js}"]
})