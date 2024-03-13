import mongoose from "mongoose";

export interface AccountType {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    code: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
}