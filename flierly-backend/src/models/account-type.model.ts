import mongoose from "mongoose";
import { AccountType } from "./interfaces/account-type.interface";

const schema: mongoose.Schema<AccountType> = new mongoose.Schema<AccountType>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        code: {
            type: String,
            required: [true, "Account-type code is required."],
            unique: true,
            uppercase: true,
            immutable: true
        },
        name: {
            type: String,
            required: [true, "Account type name is required."]
        }
    },
    {
        timestamps: true,
        collection: "account-types"
    }
);

const AccountTypeModel: mongoose.Model<AccountType> = mongoose.model<AccountType>('AccountType', schema);

export default AccountTypeModel;