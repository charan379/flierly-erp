import mongoose from "mongoose";
import { Address } from "./address.interface";

export interface TaxIdentity {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    gst?: string,
    gstRegistrationDate?: Date,
    gstVerified: boolean,
    gstAddress?: Address | mongoose.ObjectId,
    pan?: string,
    panVerified: boolean,
    vat?: string,
    tin?: string,
    createdAt: Date,
    updatedAt: Date,
}