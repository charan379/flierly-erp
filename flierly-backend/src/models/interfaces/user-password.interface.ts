import mongoose from "mongoose";

export interface UserPassowrd {
    _id: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}