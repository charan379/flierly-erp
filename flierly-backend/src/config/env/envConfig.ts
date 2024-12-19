require("dotenv").config();

const EnvConfig = Object.freeze({
    // 
    PORT: process.env.PORT || 3000,
    //   
    HTTPS: process.env.HTTPS === "true" ? true : false,
    //   
    COOKIE_SECRET: process.env.COOKIE_SECRET || "laka*%^+=-(`~1!laka*%^+=-(`~1!laka*%^+=-(`~1!laka thom thom*%^+=-(`~1!thom",
    //   
    JWT_SECRET: process.env.JWT_SECRET || "laka*%^+=-(`~1!laka*%^+=-(`~1!laka*%^+=-(`~1!laka thom thom*%^+=-(`~1!thom",
    //   
    DOMAIN_NAME: "",
    // 
    CORS_ORIGINS: process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(",").map((origin) => origin)
        : ["http://localhost:3000"],
    //  
    NODE_ENV: process.env?.NODE_ENV ?? "development",
    // 
    DB_HOST: process.env.DB_HOST ?? "localhost",
    // 
    DB_PORT: process.env.DB_PORT ?? 5432,
    // 
    DB_NAME: process.env.DB_NAME ?? "flierly",
    // 
    DB_USERNAME: process.env.DB_USERNAME ?? "postgres",
    // 
    DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",
    // 
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || "",
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || "",
    S3_REGION: process.env.S3_REGION || "",
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "flierly",
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME || "flierly",
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING || "",
    AZURE_CONTAINER_NAME: process.env.AZURE_CONTAINER_NAME || "flierly",
    DO_SPACES_ENDPOINT: process.env.DO_SPACES_ENDPOINT || "nyc3.digitaloceanspaces.com",
    DO_SPACES_KEY: process.env.DO_SPACES_KEY || "",
    DO_SPACES_SECRET: process.env.DO_SPACES_SECRET || "",
    DO_SPACES_BUCKET_NAME: process.env.DO_SPACES_BUCKET_NAME || "flierly",
    B2_APPLICATION_KEY_ID: process.env.B2_APPLICATION_KEY_ID || "",
    B2_APPLICATION_KEY: process.env.B2_APPLICATION_KEY || "",
    B2_BUCKET_ID: process.env.B2_BUCKET_ID || "flierly",
    TENCENT_CLOUD_SECRET_ID: process.env.TENCENT_CLOUD_SECRET_ID || "",
    TENCENT_CLOUD_SECRET_KEY: process.env.TENCENT_CLOUD_SECRET_KEY || "",
    TENCENT_CLOUD_BUCKET_NAME: process.env.TENCENT_CLOUD_BUCKET_NAME || "flierly",
    TENCENT_CLOUD_REGION: process.env.TENCENT_CLOUD_REGION || "ap-guangzhou",
    STORAGE_TYPE: process.env.STORAGE_TYPE || "local",
});

export default EnvConfig;