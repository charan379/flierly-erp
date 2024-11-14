import mongoose from "mongoose";
import { UserRole } from "./user-role.interface";
import { UserPermission } from "./user-permission.interface";
import { Role } from "./role.interface";
import { Privilege } from "./privilege.interface";

export interface User {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    username: string,
    email: string,
    mobile: string,
    additionalPrivileges: mongoose.ObjectId[] | Privilege[],
    restrictedPrivileges: mongoose.ObjectId[] | Privilege[],
    roles: mongoose.ObjectId[] | Role[],
    createdAt: Date,
    updatedAt: Date,
}