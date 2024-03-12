import mongoose from "mongoose";

export interface User {
    id: mongoose.ObjectId,
    isDeleted: boolean,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}