import mongoose from "mongoose";
import { Role } from "./role.interface";

export interface UserRoles {
    _id: mongoose.ObjectId;
    userId: mongoose.ObjectId;
    roles: Role[]
    createdAt: Date,
    updatedAt: Date,
}