import mongoose from "mongoose";

export interface AccessGroup {
    _id: mongoose.ObjectId;
    name: String,
    permissions: String[],
    createdAt: Date,
    updatedAt: Date,
}