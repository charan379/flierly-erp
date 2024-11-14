import { cleanEnv, port, str, url, bool } from "envalid"
import { urlArray } from "./customValidators";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        HTTPS: bool(),
        MONGODB_SERVER_STRING: str(),
        JWT_SECRET: str(),
        DOMAIN_NAME: url(),
        CORS_ORIGINS: urlArray(),
    });
};

export default validateEnv;