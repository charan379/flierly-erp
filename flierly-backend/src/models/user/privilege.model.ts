import mongoose from "mongoose";
import AccessType from "@/constants/accessTypes";
import { Privilege } from "../interfaces/privilege.interface";

const schema: mongoose.Schema<Privilege> = new mongoose.Schema<Privilege>(
    {
        name: {
            type: String,
            required: [true, "Privilege name is required."],
            immutable: true,
            unique: true
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
            required: [true, "Privilege code is required."],
            immutable: true,
            unique: true
        }
    },
    {
        timestamps: true,
        collection: "privileges"
    }
);

schema.index({ code: 1 });
schema.index({ name: 1 });
schema.index({ model: 1 })

const PrivilegeModel: mongoose.Model<Privilege> = mongoose.model<Privilege>('Privilege', schema);

export default PrivilegeModel;