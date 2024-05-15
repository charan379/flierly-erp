import AccessType from "@/constants/accessTypes";
import { getModelsList } from "@/models";
import { Permission } from "@/models/interfaces/permission.interface";
import PermissionModel from "@/models/permission.model";
import getDifferenceFromArrayOfObjects from "@/utils/get-difference-from-arary-of-objects.util";


async function generatePermissionsArray(): Promise<Partial<Permission>[]> {
    const permissions: Partial<Permission>[] = [];
    const models = await getModelsList();
    for (let model = 0; model < models.length; model++) {
        Object.values(AccessType).forEach((access) => {
            const permission: Partial<Permission> = {
                name: models[model].name.split("-").map(str => str[0].toUpperCase() + str.slice(1)).join(" "),
                accessType: access,
                model: models[model].entity,
                code: `${models[model].name}.${access.toLowerCase()}`,
            }
            permissions.push(permission);
        })
    }
    return permissions;
}

async function generatePermissions() {
    const permissions: Partial<Permission>[] = await generatePermissionsArray();

    const existingPermissions: Permission[] = await PermissionModel.find();

    const permissionsToBeAdded: Partial<Permission>[] = getDifferenceFromArrayOfObjects<Partial<Permission>>(existingPermissions, permissions, "code");

    const permissionsToBeRemoved: Permission[] = getDifferenceFromArrayOfObjects<Permission>(permissions, existingPermissions, "code");

    console.log(`🔑 [Generate Permissions]: \n
    New permissions to be added: ${permissionsToBeAdded.length} \n
    Old permissions to be removed: ${permissionsToBeRemoved.length} \n
    `);

    if (permissionsToBeRemoved.length > 0) {
        PermissionModel.deleteMany(permissionsToBeRemoved).then((result) => {
            console.log(`🔑 [Delete Permissions]: Deleted ${result.deletedCount} permissions`);
        });
    };

    if (permissionsToBeAdded.length > 0) {
        const result = await PermissionModel.insertMany(permissionsToBeAdded);
        console.log(`🔑 [Generate Permissions]: Generated ${result.length} permissions. \n
         Generated permissions are:  ${result.map(permission => permission.code).join(', ')} \n`);
    };

};


export default generatePermissions;