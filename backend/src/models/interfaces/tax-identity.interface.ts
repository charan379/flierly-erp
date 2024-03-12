import { Address } from "cluster"

export interface TaxIdentity {
    id: number,
    isDeleted: boolean,
    isActive: boolean,
    gst?: string,
    gstRegistrationDate?: Date,
    gstVerified: boolean,
    gstAddress?: Address,
    pan?: string,
    panVerified: boolean,
    vat?: string,
    tin?: string,
    createdAt: Date,
    updatedAt: Date,
}