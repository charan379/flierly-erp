import mongoose from "mongoose";
import { Privilege } from "./privilege.interface";

export interface RolePrivileges {
    _id: mongoose.ObjectId;
    roleId: mongoose.ObjectId,
    privileges: Privilege[],
    createdAt: Date,
    updatedAt: Date,
}