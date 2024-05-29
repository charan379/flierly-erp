import mongoose from "mongoose";
import { Permission } from "./interfaces/permission.interface";
import AccessType from "@/constants/accessTypes";

const schema: mongoose.Schema<Permission> = new mongoose.Schema<Permission>(
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
        collection: "permissions"
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });

const PermissionModel: mongoose.Model<Permission> = mongoose.model<Permission>('Permission', schema);

export default PermissionModel;