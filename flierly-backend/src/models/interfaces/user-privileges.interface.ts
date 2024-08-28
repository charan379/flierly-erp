import mongoose from "mongoose";
import { Privilege } from "./privilege.interface";

export interface UserPrivileges {
    _id: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    enabledFor: Privilege[],
    disabledFor: Privilege[],
    createdAt: Date,
    updatedAt: Date,
}