import AccessType from "@/constants/accessTypes";
import { getModelsList } from "@/models";
import { Permission } from "@/models/interfaces/permission.interface";


async function generatePermissions(): Promise<Partial<Permission>[]> {
    const permissions: Partial<Permission>[] = [];
    try {
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

    } catch (error) {
        console.log(error);
    }

    return permissions;
}

export default generatePermissions;