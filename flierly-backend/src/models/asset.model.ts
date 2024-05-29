import mongoose from "mongoose";
import { Asset } from "./interfaces/asset.interface";


const schema: mongoose.Schema<Asset> = new mongoose.Schema<Asset>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        manufacturingDate: {
            type: Date,
            required: [true, "Asset Manufactuting date is required."]
        },
        imei1: {
            type: String
        },
        imei2: {
            type: String
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            autopopulate: true,
            immutable: true,
            required: [true, "Product details are required."]
        },
        serialNumber: {
            type: String,
            required: [true, "Asset serial number is required."]
        }
    },

    {
        timestamps: true,
        collection: "assets",
    }
)

schema.plugin(require('mongoose-autopopulate'));

const assetModel: mongoose.Model<Asset> = mongoose.model<Asset>('Asset', schema);

export default assetModel;