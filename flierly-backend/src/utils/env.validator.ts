import { cleanEnv, port, str, url, bool, num } from "envalid"
import { urlArray } from "./customValidators";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        HTTPS: bool(),
        MONGODB_SERVER_STRING: str(),
        DB_HOST: str(),
        DB_PORT: num(),
        DB_NAME: str(),
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        JWT_SECRET: str(),
        DOMAIN_NAME: url(),
        CORS_ORIGINS: urlArray(),
    });
};

export default validateEnv;