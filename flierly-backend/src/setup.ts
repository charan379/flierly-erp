import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@": `${__dirname}`
});
import Database from '@/lib/database';
import dotenv from 'dotenv';
import validateEnv from '@/utils/env.validator';
import generatePermissions from '@/setup/generate-permissions';
import generateSuperAdmin from './setup/generate-super-admin';

dotenv.config();

// validate environment variables
validateEnv();

async function setup() {
    try {
        console.log("⚙️  [Setup]: Starting Flierly application setup...");
        // Establish Database 
        await Database.connect();

        // Generate Permissions
        await generatePermissions();

        // Generate Super Admin
        await generateSuperAdmin();

    } catch (error) {

        console.error("⚙️ 🔴 [Setup]: Flierly application setup failed: ", error);
        console.log(error)


    } finally {
        await Database.disconnect();
    }
}

setup();