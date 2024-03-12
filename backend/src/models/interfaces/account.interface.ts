import mongoose from "mongoose"
import { Branch } from "./branch.interface"
import { TaxIdentity } from "./tax-identity.interface"

export interface Account {
    id: mongoose.ObjectId,
    isDeleted: boolean,
    accountType: { code: string, name: string }
    accountSubtype: { code: string, name: string },
    isVip: boolean,
    isKey: boolean,
    name: string,
    registeredPhone: string,
    alternatePhone: string,
    email: string,
    branch: Branch,
    taxIdentity: TaxIdentity
    parent?: Account,
    createdAt: Date,
    updatedAt: Date,
}