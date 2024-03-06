type Branch = {
    id: number,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    address: Address,
    addressId: number,
    taxIdentity?: TaxIdentity,
    taxIdentityId: number,
    accounts?: Account[],
    contacts?: Contact[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number,
}

type Address = {
    id: number,
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
    taxIdentity?: TaxIdentity,
    branch?: Branch,
    contacts?: Contact[],
    account?: Account,
    accountId?: number,
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}

type TaxIdentity = {
    id: number,
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

type Contact = {
    id: number,
    name: string,
    email: string,
    phone: string,
    alternatePhone: string,
    address?: Address,
    addressId: number,
    branch?: Branch,
    branchId?: number
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}

type AccountType = {
    id: number,
    name: string,
    subtypes?: AccountSubtype[],
    accounts?: Account[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}

type AccountSubtype = {
    id: number,
    name: string,
    accountType?: AccountType,
    accountTypeId?: number,
    accounts?: Account[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}

type Account = {
    id: number,
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
    addresses: Address[],
    parentId?: number,
    parent?: Account,
    childAccoutns?: Account[],
    createdAt: Date,
    updatedAt: Date,
    lastModifiedBy?: User
    lastModifiedByUserId?: number
}

type User = {
    id: number,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}