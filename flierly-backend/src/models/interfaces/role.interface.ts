import mongoose from "mongoose";

export interface Role {
    _id: mongoose.ObjectId;
    name: String,
    code: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
}