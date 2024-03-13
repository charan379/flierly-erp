import mongoose from "mongoose";
import { Branch } from "./interfaces/branch.interface";

const schema: mongoose.Schema<Branch> = new mongoose.Schema<Branch>(
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
            required: [true, "Branch name is requried."],
        },
        email: {
            type: String,
            required: [true, "Branch email is required."],
        },
        phone: {
            type: String,
            required: [true, "Branch phone is required."],
        },
        alternatePhone: {
            type: String,
            required: false
        },
        address: {
            type: mongoose.Schema.ObjectId,
            ref: 'Branch',
            autopopulate: true
        },
        taxIdentity: {
            type: mongoose.Schema.ObjectId,
            ref: 'TaxIdentity',
            autopopulate: true
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        },
        collection: "braches",
    }
);


schema.plugin(require('mongoose-autopopulate'));

const BranchModel: mongoose.Model<Branch> = mongoose.model<Branch>("Branch", schema);

export default BranchModel;