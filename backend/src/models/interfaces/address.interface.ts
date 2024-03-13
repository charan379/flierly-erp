import mongoose from "mongoose"

export interface Address {
    id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    line1: string,
    line2: string,
    line3?: string,
    landmark: string,
    area: string,
    city: string,
    district: string,
    state: string,
    pincode: string,
    geoLocation?: {
        latitude: number,
        longitude: number,
    }
    branchId: mongoose.ObjectId,
    accountId: mongoose.ObjectId,
    contactId: mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}