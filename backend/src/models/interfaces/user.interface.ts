import mongoose from "mongoose";

export interface User {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    username: string,
    password: string,
    email: string,
    mobile: string,
    createdAt: Date,
    updatedAt: Date,
}