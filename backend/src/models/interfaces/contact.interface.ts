import mongoose from "mongoose";

export interface Contact {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    branchId: mongoose.ObjectId,
    accountId: mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}