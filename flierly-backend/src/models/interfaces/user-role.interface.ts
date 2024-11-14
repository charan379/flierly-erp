import mongoose from "mongoose";
import { UserPermission } from "./user-permission.interface";

export interface UserRole {
    _id: mongoose.ObjectId;
    name: String,
    code: String,
    permissions: String[] | UserPermission[],
    createdAt: Date,
    updatedAt: Date,
}