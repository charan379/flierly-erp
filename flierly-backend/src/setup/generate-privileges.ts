import AccessType from "@/constants/accessTypes";
import { getModelsList } from "@/models";
import { Privilege } from "@/models/interfaces/privilege.interface";
import PrivilegeModel from "@/models/user/privilege.model";
import getDifferenceFromArrayOfObjects from "@/utils/get-difference-from-arary-of-objects.util";

async function generatePrivilegesArray(): Promise<Partial<Privilege>[]> {
    const privileges: Partial<Privilege>[] = [];
    const models = await getModelsList();
    for (let model = 0; model < models.length; model++) {
        Object.values(AccessType).forEach((access) => {
            const privilege: Partial<Privilege> = {
                name: models[model].name.split("-").map(str => str[0].toUpperCase() + str.slice(1)).join(" ") + ` - ${access}`,
                access: access,
                model: models[model].entity,
                code: `${models[model].name}.${access.toLowerCase()}`,
            }
            privileges.push(privilege);
        })
    }
    return privileges;
}

async function generatePrivileges() {

    const privileges: Partial<Privilege>[] = await generatePrivilegesArray();

    const existingPrivileges: Privilege[] = await PrivilegeModel.find();

    const privilegesToBeAdded: Partial<Privilege>[] = getDifferenceFromArrayOfObjects<Partial<Privilege>>(existingPrivileges, privileges, "code");

    const privilegesToBeRemoved: Privilege[] = getDifferenceFromArrayOfObjects<Privilege>(privileges, existingPrivileges, "code");

    console.log(`🔑 [Generate Privileges]: \n
    New privileges to be added: ${privilegesToBeAdded.length} \n
    Old privileges to be removed: ${privilegesToBeRemoved.length} \n
    `);

    if (privilegesToBeRemoved.length > 0) {
        PrivilegeModel.deleteMany(privilegesToBeRemoved).then((result) => {
            console.log(`🔑 [Delete Privileges]: Deleted ${result.deletedCount} privileges`);
        });
    };

    if (privilegesToBeAdded.length > 0) {
        const result = await PrivilegeModel.insertMany(privilegesToBeAdded);
        console.log(`🔑 [Generate Privileges]: Generated ${result.length} privileges. \n
         Generated privileges are:  ${result.map(permission => permission.code).join(', ')} \n`);
    };

};


export default generatePrivileges;