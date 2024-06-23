import mongoose from "mongoose";
import { UserRole } from "./interfaces/user-role.interface";


const schema: mongoose.Schema<UserRole> = new mongoose.Schema<UserRole>(
    {
        name: {
            type: String,
            required: [true, "Role name is required."]
        },
        code: {
            type: String,
            required: [true, "Role code is required."],
            immutable: true,
            unique: true
        },
        permissions: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'UserPermission', autopopulate: { select: ['name', 'accessType', 'model', 'code'] } }],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'user-roles'
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });

schema.plugin(require('mongoose-autopopulate'));

const UserRoleModel: mongoose.Model<UserRole> = mongoose.model<UserRole>('UserRole', schema);

export default UserRoleModel;