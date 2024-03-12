import mongoose, { Model, Schema } from "mongoose";
import { Branch } from "./interfaces/branch.interface";

const schema: Schema<Branch> = new Schema<Branch>(
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
            required: true,
            
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        alternatePhone: {
            type: String,
            required: false
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

const BranchModel: Model<Branch> = mongoose.model<Branch>("Branch", schema);

export default BranchModel;