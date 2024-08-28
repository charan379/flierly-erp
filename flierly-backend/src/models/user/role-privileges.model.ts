import mongoose from "mongoose";
import { RolePrivileges } from "../interfaces/role-privileges.interface";


const schema: mongoose.Schema<RolePrivileges> = new mongoose.Schema<RolePrivileges>(
    {
        roleId: {
            type: mongoose.Schema.ObjectId,
            required: [true, "RoleId is required."],
            unique: true
        },
        privileges: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Privilege', autopopulate: { select: ['name', 'access', 'model', 'code'] } }],
            default: []
        },
    },
    {
        timestamps: true,
        collection: 'role-privileges'
    }
);

schema.index({ roleId: 1 })

schema.plugin(require('mongoose-autopopulate'));

const RoleModel: mongoose.Model<RolePrivileges> = mongoose.model<RolePrivileges>('RolePrivileges', schema);

export default RoleModel;