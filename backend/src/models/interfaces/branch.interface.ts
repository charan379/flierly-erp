import mongoose from "mongoose";
import { Address } from "./address.interface";
import { TaxIdentity } from "./tax-identity.interface";

export interface Branch {
    _id: mongoose.Types.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    address: Address,
    taxIdentity: TaxIdentity,
    createdAt: Date,
    updatedAt: Date,
};