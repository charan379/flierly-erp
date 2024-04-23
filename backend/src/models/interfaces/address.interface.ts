import mongoose from "mongoose"
import { Branch } from "./branch.interface"
import { Account } from "./account.interface"
import { Contact } from "./contact.interface"

export interface Address {
    _id: mongoose.ObjectId,
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
    branch: Branch | mongoose.ObjectId,
    account: Account | mongoose.ObjectId,
    contact: Contact | mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}