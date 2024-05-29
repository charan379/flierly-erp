import mongoose from "mongoose";
import { Branch } from "./branch.interface";
import { Account } from "./account.interface";

export interface Contact {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    branch: Branch | mongoose.ObjectId,
    account: Account | mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}