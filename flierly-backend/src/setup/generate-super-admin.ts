import userDetailsPrompt from "@/setup/prompts/user-details.prompt";
import UserRoleModel from "@/models/user-role.model";
import { UserRole } from "@/models/interfaces/user-role.interface";
import UserPermissionModel from "@/models/user-permission.model";
import mongoose from "mongoose";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user.model";
import { generateHash } from "@/lib/bcrypt";

async function generateSuperAdmin(): Promise<void> {
    let superAdminRole: UserRole | null = await UserRoleModel.findOne({ code: 'super-admin' }).exec();

    if (superAdminRole === null) {
        superAdminRole = await generateSuperAdminRole();
    };

    const credsPrompt = await userDetailsPrompt();

    const superAdmin: User = await UserModel.create({
        username: credsPrompt.username,
        password: await generateHash(credsPrompt.password),
        email: credsPrompt.email,
        mobile: credsPrompt.mobile,
        roles: [superAdminRole._id],
    });

    console.log(`🔑 [Super-Admin]: Super Admin created and activated sucessfully with username: ${superAdmin.username}`);
}

async function generateSuperAdminRole(): Promise<UserRole> {
    const permissionIds: mongoose.ObjectId[] = (await UserPermissionModel.find({}).exec()).map(permission => permission._id);

    const superAdminRole: UserRole = await UserRoleModel.create({
        code: 'super-admin',
        name: 'Super Admin role',
        permissions: permissionIds,
    });
    return superAdminRole;
}


export default generateSuperAdmin;