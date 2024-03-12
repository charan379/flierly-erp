import { Branch } from "./branch.interface"

export interface Contact {
    isDeleted: boolean,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    branch?: Branch,
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
}