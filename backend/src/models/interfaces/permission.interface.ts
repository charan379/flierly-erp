import AccessType from "@/constants/accessTypes";
import mongoose from "mongoose";

export interface Permission {
    _id: mongoose.ObjectId,
    name: string,
    accessType: AccessType,
    model: string,
    code: string,
    createdAt: Date,
    updatedAt: Date,
}