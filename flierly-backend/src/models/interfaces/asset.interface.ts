import mongoose from "mongoose";

export interface Asset {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    product: mongoose.ObjectId,
    imei1?: string,
    imei2?: string,
    serialNumber: string,
    manufacturingDate: Date;
    createdAt: Date,
    updatedAt: Date,
};