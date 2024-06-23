import mongoose from "mongoose";
import { UserPermission } from "./interfaces/user-permission.interface";
import AccessType from "@/constants/accessTypes";

const schema: mongoose.Schema<UserPermission> = new mongoose.Schema<UserPermission>(
    {
        name: {
            type: String,
            required: [true, "Permission name is required."],
            immutable: true,
        },
        accessType: {
            type: String,
            enum: Object.values(AccessType),
            required: [true, "Access type is required."],
            immutable: true,
        },
        model: {
            type: String,
            required: [true, "Model name is required."],
            immutable: true
        },
        code: {
            type: String,
            required: [true, "Permission code is required."],
            immutable: true,
            unique: true
        }
    },
    {
        timestamps: true,
        collection: "user-permissions"
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });

const UserPermissionModel: mongoose.Model<UserPermission> = mongoose.model<UserPermission>('UserPermission', schema);

export default UserPermissionModel;