import mongoose from "mongoose"
import { Branch } from "./branch.interface"

export interface Account {
    id: mongoose.ObjectId,
    isDeleted: boolean,
    accountType?: AccountType
    accountTypeId: number,
    accountSubtype?: AccountSubtype,
    accountSubtypeId: number,
    isVip: boolean,
    isKey: boolean,
    name: string,
    registeredPhone: string,
    alternatePhone: string,
    email: string,
    branch?: Branch,
    branchId: number
    taxIdentity?: TaxIdentity
    taxIdentityId: number
    contacts: Contact[],
    parentId?: number,
    parent?: Account,
    childAccoutns?: Account[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}