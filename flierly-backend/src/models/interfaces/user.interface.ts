import mongoose from "mongoose";
import { UserRole } from "./user-role.interface";
import { UserPermission } from "./user-permission.interface";

export interface User {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    username: string,
    email: string,
    mobile: string,
    permissions: mongoose.ObjectId[] | UserPermission[],
    excludedPermissions: mongoose.ObjectId[] | UserPermission[],
    roles: mongoose.ObjectId[] | UserRole[],
    createdAt: Date,
    updatedAt: Date,
}