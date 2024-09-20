import Config from "@/config"
import { DataSource } from "typeorm"

const isProduction = Config.NODE_ENV === "production";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "fetest",
    synchronize: true,
    logging: !isProduction,
    entities: isProduction ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'],
    migrations: ["src/migration/**/*.{ts,js}"],
    subscribers: ["src/subscriber/**/*.{ts,js}"]
})