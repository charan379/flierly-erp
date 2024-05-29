import mongoose from "mongoose";
import { Address } from "./interfaces/address.interface";


const schema: mongoose.Schema<Address> = new mongoose.Schema<Address>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        line1: {
            type: String,
            required: [true, "Address line1 is required."]
        },
        line2: {
            type: String,
            required: [true, "Address line2 is required."]
        },
        line3: {
            type: String
        },
        landmark: {
            type: String,
            required: [true, "Address landmark is required."]
        },
        area: {
            type: String,
            required: [true, "Address area is required."]
        },
        city: {
            type: String,
            required: [true, "Address city is required."]
        },
        district: {
            type: String,
            required: [true, "Address district is required."]
        },
        state: {
            type: String,
            required: [true, "Address state is required."]
        },
        pincode: {
            type: String,
            required: [true, "Address pincode is required."]
        },
        geoLocation: {
            type: {
                latitude: {
                    type: Number,
                    required: [true, "geoLocation.latitute is required."]
                },
                longitude: {
                    type: Number,
                    required: [true, "geoLocation.longitude is required."]
                }
            },
            _id: false
        },
        branch: {
            type: mongoose.Schema.ObjectId,
            ref: "Branch",
            autopopulate: false,
        },
        account: {
            type: mongoose.Schema.ObjectId,
            ref: "Account",
            autopopulate: false
        },
        contact: {
            type: mongoose.Schema.ObjectId,
            ref: "Contact",
            autopopulate: false,
        }
    },
    {
        timestamps: true,
        collection: "addresses"
    }
);

schema.plugin(require('mongoose-autopopulate'));

const AddressModel: mongoose.Model<Address> = mongoose.model<Address>('Address', schema);

export default AddressModel;