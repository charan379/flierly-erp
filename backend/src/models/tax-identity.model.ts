import mongoose from "mongoose";
import { TaxIdentity } from "./interfaces/tax-identity.interface";

const schema: mongoose.Schema<TaxIdentity> = new mongoose.Schema<TaxIdentity>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        gst: {
            type: String
        },
        gstRegistrationDate: {
            type: Date
        },
        gstVerified: {
            type: Boolean
        },
        gstAddress: {
            type: mongoose.Schema.ObjectId,
            ref: 'Address',
            autopopulate: true
        },
        pan: {
            type: String,
        },
        panVerified: {
            type: Boolean
        },
        vat: {
            type: Boolean
        },
        tin: {
            type: Boolean
        },
    },
    {
        timestamps: true,
        collection: "tax-identities"
    }
);

schema.plugin(require('mongoose-autopopulate'));

const TaxIdentityModel: mongoose.Model<TaxIdentity> = mongoose.model<TaxIdentity>('TaxIdentity', schema);

export default TaxIdentityModel;