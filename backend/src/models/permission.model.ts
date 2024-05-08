import mongoose from "mongoose";
import { Permission } from "./interfaces/permission.interface";
import AccessType from "@/constants/accessTypes";

const schema: mongoose.Schema<Permission> = new mongoose.Schema<Permission>(
    {
        name: {
            type: String,
            required: [true, "Permission name is required."]
        },
        accessType: {
            type: String,
            enum: Object.values(AccessType),
            required: [true, "Access type is required."]
        },
        model: {
            type: String,
            required: [true, "Model name is required."]
        },
        code: {
            type: String,
            required: [true, "Permission code is required."]
        }
    },
    {
        timestamps: true,
        collection: "permissions"
    }
);

const PermissionModel: mongoose.Model<Permission> = mongoose.model<Permission>('Permission', schema);

export default PermissionModel;