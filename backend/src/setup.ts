import moduleAlias from 'module-alias';
moduleAlias.addAliases({
    "@": `${__dirname}`
});
import Database from '@/lib/database';
import dotenv from 'dotenv';
import validateEnv from '@/utils/env.validator';
import generatePermissions from '@/setup/generate-permissions';
import { Permission } from './models/interfaces/permission.interface';
import PermissionModel from './models/permission.model';

dotenv.config();

// validate environment variables
validateEnv();

async function setup() {
    try {
        console.log("⚙️     [Setup]: Starting Flierly application setup...");
        await Database.connect();
        const permissions: Partial<Permission>[] = await generatePermissions();
        PermissionModel.deleteMany({}).then((result) => {
            console.log(result);
        });
        const savedPermissions = await PermissionModel.insertMany(permissions);
        console.log(`⚙️     [Setup]: Generated ${savedPermissions.length} permissions.`)
    } catch (error) {
        console.error("🔴   [Setup]: Flierly application setup failed: ", error);
        console.log(error)
    } finally {
        await Database.disconnect();
    }
}

setup();