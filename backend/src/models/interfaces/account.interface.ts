import mongoose from "mongoose"
import { Branch } from "./branch.interface"
import { TaxIdentity } from "./tax-identity.interface"

export interface Account {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    accountType: { code: string, name: string }
    accountSubtype: { code: string, name: string },
    isVip: boolean,
    isKey: boolean,
    name: string,
    registeredPhone: string,
    alternatePhone: string,
    email: string,
    branch: Branch | mongoose.ObjectId,
    taxIdentity: TaxIdentity | mongoose.ObjectId
    parent?: Account | mongoose.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}