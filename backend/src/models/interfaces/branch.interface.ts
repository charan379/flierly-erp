import mongoose from "mongoose";

export interface Branch {
    _id: mongoose.Types.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    createdAt: Date,
    updatedAt: Date,
};