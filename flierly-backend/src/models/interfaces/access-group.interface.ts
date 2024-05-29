import mongoose from "mongoose";
import { Permission } from "./permission.interface";

export interface AccessGroup {
    _id: mongoose.ObjectId;
    name: String,
    code: String,
    permissions: String[] | Permission[],
    createdAt: Date,
    updatedAt: Date,
}