import mongoose from "mongoose";
import { Organization } from "./interfaces/organization.interface";

const schema: mongoose.Schema<Organization> = new mongoose.Schema<Organization>(
    {
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            required: [true, "Organization name is required."]
        },
        email: {
            type: String,
            required: [true, "Organization email is required."]
        },
        phone: {
            type: String,
            required: [true, "Organization phone is required."]
        }
    },
    {
        timestamps: true,
        collection: 'organizations'
    }
);

const OrganizationModel: mongoose.Model<Organization> = mongoose.model<Organization>('Organization', schema);

export default OrganizationModel;