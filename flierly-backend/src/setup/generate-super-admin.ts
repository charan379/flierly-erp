import userDetailsPrompt from "@/setup/prompts/user-details.prompt";
import UserRoleModel from "@/models/user/user-role.model";
import { UserRole } from "@/models/interfaces/user-role.interface";
import UserPermissionModel from "@/models/user/user-permission.model";
import mongoose from "mongoose";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import { generateHash } from "@/lib/bcrypt";
import { UserPassword } from '@/models/interfaces/user-password.interface';
import UserPasswordModel from "@/models/user/user-password.model";

async function generateSuperAdmin(): Promise<void> {
    let superAdminRole: UserRole | null = await UserRoleModel.findOne({ code: 'super-admin' }).exec();

    if (superAdminRole === null) {
        superAdminRole = await generateSuperAdminRole();
    };

    const credsPrompt = await userDetailsPrompt();

    const superAdmin: User = await UserModel.create({
        username: credsPrompt.username,
        email: credsPrompt.email,
        mobile: credsPrompt.mobile,
        roles: [superAdminRole._id],
    });

    await updateUserPassword(superAdmin._id, credsPrompt.password);

    console.log(`🔑 [Super-Admin]: Super Admin created and activated sucessfully with \n 
        username: ${superAdmin.username} \n
        passowrd: ${credsPrompt.password}
        `);
}

async function updateUserPassword(userId: mongoose.ObjectId, password: string): Promise<UserPassword> {

    const updatedExistingPassword: UserPassword | null = await UserPasswordModel.findOneAndUpdate(
        { userId: userId },
        { $set: { password: await generateHash(password) }, },
        {
            new: true, // Return the updated document
            runValidators: true, // Apply validation before saving
        },
    ).exec()


    if (updatedExistingPassword !== null) {
        return updatedExistingPassword;
    }
    else {
        return await UserPasswordModel.create({
            userId, password: await generateHash(password)
        });
    }

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