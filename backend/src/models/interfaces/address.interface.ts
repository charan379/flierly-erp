import mongoose from "mongoose"

export interface Address {
    id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    line1: string,
    line2: string,
    line3: string,
    landmark: string,
    area: string,
    city: string,
    district: string,
    state: string,
    pincode: string,
    latitude: number,
    longitude: number,
    createdAt: Date,
    updatedAt: Date,
}