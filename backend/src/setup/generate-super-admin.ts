import AccessGroupModel from "@/models/access-group.model";
import { AccessGroup } from "@/models/interfaces/access-group.interface";
import PermissionModel from "@/models/permission.model";
import { string } from "joi";
import mongoose from "mongoose";
import prompter from "prompts";



async function generateSuperAdmin(): Promise<void> {
    let superAdminGroup: AccessGroup | null = await AccessGroupModel.findOne({ code: 'super-admin' }).exec();

    if (superAdminGroup === null) {
        superAdminGroup = await generateSuperAdminGroup();
    };

    const response: { username: string, password: string, confirm_password: string } = await prompter([{
        type: 'text',
        name: 'username',
        message: 'Username for super admin: ',
        validate: value => /^([a-z0-9&.-]){5,25}$/.test(value) ? true : 'Invalid username',
    },
    {
        type: 'password',
        name: 'password',
        message: 'Password for super admin: ',
        validate: value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,28}$/.test(value) ? true : 'Invalid password'
    },
    {
        type: 'password',
        name: 'confirm_password',
        message: 'Confirm password for super admin: ',
        validate: value => value === response.password ? true : "Password doesn't match"
    }]);

    console.log(response)

}

async function generateSuperAdminGroup(): Promise<AccessGroup> {
    const permissionIds: mongoose.ObjectId[] = (await PermissionModel.find({}).exec()).map(permission => permission._id);

    const superAdminGroup: AccessGroup = await AccessGroupModel.create({
        code: 'super-admin',
        name: 'Super Admin access group',
        permissions: permissionIds,
    });
    return superAdminGroup;
}

export default generateSuperAdmin;