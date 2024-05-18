import AccessGroupModel from "@/models/access-group.model";
import { AccessGroup } from "@/models/interfaces/access-group.interface";
import PermissionModel from "@/models/permission.model";
import mongoose from "mongoose";



async function generateSuperAdmin(): Promise<void> {
    let superAdminGroup: AccessGroup | null = await AccessGroupModel.findOne({ name: 'super-admin' }).exec();

    if (superAdminGroup === null) {
        superAdminGroup = await generateSuperAdminGroup();
    };

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