require("dotenv").config();

const Config = Object.freeze({
    // 
    PORT: process.env.PORT || 3000,
    //   
    MONGODB_SERVER_STRING: process.env.MONGODB_SERVER_STRING,
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
});

export default Config;