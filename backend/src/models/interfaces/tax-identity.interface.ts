import { Address } from "cluster"
import { Branch } from "./branch.interface"

export interface TaxIdentity {
    id: number,
    isDeleted: boolean,
    isActive: boolean,
    gst?: string,
    gstRegistrationDate?: Date,
    gstVerified: boolean,
    gstAddress?: Address,
    gstAddressId?: number,
    pan?: string,
    panVerified: boolean,
    vat?: string,
    tin?: string,
    account?: Account[],
    branch?: Branch[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}