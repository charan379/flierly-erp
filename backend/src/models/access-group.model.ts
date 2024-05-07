import mongoose from "mongoose";
import { AccessGroup } from "./interfaces/access-group.interface";


const schema: mongoose.Schema<AccessGroup> = new mongoose.Schema<AccessGroup>(
    {
        name: {
            type: String,
            required: [true, "Access group name is required."]
        },
        permissions: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'user-groups'
    }
);

const AccessGroupModel: mongoose.Model<AccessGroup> = mongoose.model<AccessGroup>('AccessGroup', schema);

export default AccessGroupModel;