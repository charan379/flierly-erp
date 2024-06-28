import { cleanEnv, port, str } from "envalid"

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        MONGODB_SERVER_STRING: str(),
        JWT_SECRET: str(),
    });
};


export default validateEnv;