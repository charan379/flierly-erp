import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@": `${__dirname}`
});
import 'reflect-metadata'
import Database from '@/lib/database';
import dotenv from 'dotenv';
import validateEnv from '@/utils/env.validator';
import generateSuperAdmin from './setup/generate-super-admin';
import generatePrivileges from './setup/generate-privileges';
import { AppDataSource } from '@/lib/app-data-source';

dotenv.config();

// validate environment variables
validateEnv();

async function setup() {
    try {
        console.log("⚙️  [Setup]: Starting Flierly application setup...");
        // Establish Database 
        await Database.connect();

        await AppDataSource.initialize();

        if (AppDataSource.isInitialized) {
            console.info("🚀 [postgres]: Database is initialized successfully");
            // Generate Permissions
            await generatePrivileges();

            // Generate Super Admin
            await generateSuperAdmin();
        }

    } catch (error) {

        console.error("⚙️ 🔴 [Setup]: Flierly application setup failed: ", error);
        console.log(error)


    } finally {
        await Database.disconnect();
        // AppDataSource.destroy();
    }
}

setup();