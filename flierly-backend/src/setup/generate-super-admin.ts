import userDetailsPrompt from "@/setup/prompts/user-details.prompt";
import mongoose from "mongoose";
import { User } from "@/models/interfaces/user.interface";
import UserModel from "@/models/user/user.model";
import { generateHash } from "@/lib/bcrypt";
import { UserPassword } from '@/models/interfaces/user-password.interface';
import UserPasswordModel from "@/models/user/user-password.model";
import { Role } from "@/models/interfaces/role.interface";
import RoleModel from "@/models/user/role.model";
import PrivilegeModel from "@/models/user/privilege.model";
import { RolePrivileges } from "@/models/interfaces/role-privileges.interface";
import RolePrivilegesModel from "@/models/user/role-privileges.model";

async function generateSuperAdmin(): Promise<void> {
    let superAdminRole: Role | null = await RoleModel.findOne({ code: 'super-admin' }).exec();

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

async function generateSuperAdminRole(): Promise<Role> {
    const privilegeIds: mongoose.ObjectId[] = (await PrivilegeModel.find({}).exec()).map(privilege => privilege._id);

    const superAdminRole: Role = await RoleModel.create({
        code: 'super-admin',
        name: 'Super Admin Role',
        description: "Account Owner / Super Admin"
    });

    await assignRolePrivileges(superAdminRole._id, privilegeIds);

    return superAdminRole;
}

async function assignRolePrivileges(roleId: mongoose.ObjectId, privilegIds: mongoose.ObjectId[]) {
    const updatedExistingRolePrivileges: RolePrivileges | null = await RolePrivilegesModel.findOneAndUpdate(
        { roleId: roleId },
        { $addToSet: { privileges: { $each: privilegIds } }, },
        {
            new: true, // Return the updated document
            runValidators: true, // Apply validation before saving
        },
    ).exec()


    if (updatedExistingRolePrivileges !== null) {
        return updatedExistingRolePrivileges;
    }
    else {
        return await RolePrivilegesModel.create({
            roleId: roleId,
            privileges: privilegIds
        });
    }

}


export default generateSuperAdmin;