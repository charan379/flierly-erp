import mongoose from "mongoose";
import { Account } from "../interfaces/account.interface";


const schema: mongoose.Schema<Account> = new mongoose.Schema<Account>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        accountType: {
            type: {
                code: {
                    type: String,
                    uppercase: true,
                    required: [true, "Account type code is required."]
                },
                name: {
                    type: String,
                    required: [true, "Account type name is required."]
                }
            },
            required: [true, "Account type is required."]
        },
        accountSubtype: {
            type: {
                code: {
                    type: String,
                    uppercase: true,
                    required: [true, "Account Subtype code is required."]
                },
                name: {
                    type: String,
                    required: [true, "Account Subtype name is required."]
                }
            }
        },
        isVip: {
            type: Boolean,
            default: false
        },
        isKey: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: [true, "Account name is required."],
        },
        registeredPhone: {
            type: String,
            required: [true, "Account registered phone is required."]
        },
        alternatePhone: {
            type: String
        },
        email: {
            type: String,
            required: [true, "Account email is required."]
        },
        branch: {
            type: mongoose.Schema.ObjectId,
            ref: 'Branch',
            autopopulate: true
        },
        taxIdentity: {
            type: mongoose.Schema.ObjectId,
            ref: 'TaxIdentity',
            autopopulate: true,
        },
        parent: {
            type: mongoose.Schema.ObjectId,
            ref: 'Account',
            autopopulate: true,
        }
    },
    {
        timestamps: true,
        collection: 'accounts'
    }
);

schema.plugin(require('mongoose-autopopulate'));

const AccountModel: mongoose.Model<Account> = mongoose.model<Account>('Account', schema);

export default AccountModel;