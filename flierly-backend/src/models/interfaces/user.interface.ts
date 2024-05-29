import mongoose from "mongoose";
import { AccessGroup } from "./access-group.interface";
import { Permission } from "./permission.interface";

export interface User {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    username: string,
    password: string,
    email: string,
    mobile: string,
    permissions: mongoose.ObjectId[] | Permission[],
    excludedPermissions: mongoose.ObjectId[] | Permission[],
    accecesGroups: mongoose.ObjectId[] | AccessGroup[],
    createdAt: Date,
    updatedAt: Date,
}