import mongoose from "mongoose";
import { AccountSubtype } from "./interfaces/account-subtype.interface";


const schema: mongoose.Schema<AccountSubtype> = new mongoose.Schema<AccountSubtype>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        code: {
            type: String,
            required: [true, "Account subtype code is required."],
            immutable: true,
            uppercase: true,
        },
        name: {
            type: String,
            required: [true, "Account subtype name is required."]
        },
        parentTypeCode: {
            type: String,
            required: [true, "Account subtype parent code is required."],
            uppercase: true,
        },
    },
    {
        timestamps: true,
        collection: "account-subtypes"
    }
);

const AccountSubtypeModel: mongoose.Model<AccountSubtype> = mongoose.model<AccountSubtype>('AccountSubtype', schema);

export default AccountSubtypeModel;