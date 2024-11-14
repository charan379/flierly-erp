import AccessType from "@/constants/accessTypes";
import mongoose from "mongoose";

export interface Privilege {
    _id: mongoose.ObjectId,
    name: string,
    access: AccessType,
    model: string,
    code: string,
    createdAt: Date,
    updatedAt: Date,
}