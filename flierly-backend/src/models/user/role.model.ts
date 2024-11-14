import mongoose from "mongoose";
import { Role } from "../interfaces/role.interface";


const schema: mongoose.Schema<Role> = new mongoose.Schema<Role>(
    {
        name: {
            type: String,
            required: [true, "Role name is required."],
            unique: true
        },
        code: {
            type: String,
            required: [true, "Role code is required."],
            immutable: true,
            unique: true
        },
        description: {
            type: String,
            require: [true, "Role description is required."]
        }
    },
    {
        timestamps: true,
        collection: 'roles'
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });

schema.plugin(require('mongoose-autopopulate'));

const RoleModel: mongoose.Model<Role> = mongoose.model<Role>('Role', schema);

export default RoleModel;