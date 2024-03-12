export interface AccountSubtype {
    id: number,
    isDeleted: boolean,
    code: string,
    name: string,
    parentTypeCode: string,
    createdAt: Date,
    updatedAt: Date,
}