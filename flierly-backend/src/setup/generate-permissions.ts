import AccessType from "@/constants/accessTypes";
import { getModelsList } from "@/models";
import { UserPermission } from "@/models/interfaces/user-permission.interface";
import UserPermissionModel from "@/models/user/user-permission.model";
import getDifferenceFromArrayOfObjects from "@/utils/get-difference-from-arary-of-objects.util";


async function generatePermissionsArray(): Promise<Partial<UserPermission>[]> {
    const permissions: Partial<UserPermission>[] = [];
    const models = await getModelsList();
    for (let model = 0; model < models.length; model++) {
        Object.values(AccessType).forEach((access) => {
            const permission: Partial<UserPermission> = {
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
    const permissions: Partial<UserPermission>[] = await generatePermissionsArray();

    const existingPermissions: UserPermission[] = await UserPermissionModel.find();

    const permissionsToBeAdded: Partial<UserPermission>[] = getDifferenceFromArrayOfObjects<Partial<UserPermission>>(existingPermissions, permissions, "code");

    const permissionsToBeRemoved: UserPermission[] = getDifferenceFromArrayOfObjects<UserPermission>(permissions, existingPermissions, "code");

    console.log(`🔑 [Generate Permissions]: \n
    New permissions to be added: ${permissionsToBeAdded.length} \n
    Old permissions to be removed: ${permissionsToBeRemoved.length} \n
    `);

    if (permissionsToBeRemoved.length > 0) {
        UserPermissionModel.deleteMany(permissionsToBeRemoved).then((result) => {
            console.log(`🔑 [Delete Permissions]: Deleted ${result.deletedCount} permissions`);
        });
    };

    if (permissionsToBeAdded.length > 0) {
        const result = await UserPermissionModel.insertMany(permissionsToBeAdded);
        console.log(`🔑 [Generate Permissions]: Generated ${result.length} permissions. \n
         Generated permissions are:  ${result.map(permission => permission.code).join(', ')} \n`);
    };

};


export default generatePermissions;