import mongoose from "mongoose";

export interface AccountSubtype {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    code: string,
    name: string,
    parentTypeCode: string,
    createdAt: Date,
    updatedAt: Date,
}