import mongoose from "mongoose";


export interface Organization {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    name: string,
    email: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date,
}