import mongoose from "mongoose";
import { AccessGroup } from "./interfaces/access-group.interface";


const schema: mongoose.Schema<AccessGroup> = new mongoose.Schema<AccessGroup>(
    {
        name: {
            type: String,
            required: [true, "Access group name is required."]
        },
        code: {
            type: String,
            required: [true, "Access group code is required."],
            immutable: true,
            unique: true
        },
        permissions: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Permission', autopopulate: { select: ['name', 'accessType', 'model', 'code'] } }],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'access-groups'
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });

schema.plugin(require('mongoose-autopopulate'));

const AccessGroupModel: mongoose.Model<AccessGroup> = mongoose.model<AccessGroup>('AccessGroup', schema);

export default AccessGroupModel;