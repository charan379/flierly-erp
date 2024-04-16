import mongoose from "mongoose";

export interface Product {
    _id: mongoose.ObjectId;
    isDeleted: Boolean,
    isActive: Boolean,
    isSerialized: Boolean,
    name: String
}