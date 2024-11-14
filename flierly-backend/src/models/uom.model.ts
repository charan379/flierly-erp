import mongoose from "mongoose";
import { Uom } from "./interfaces/uom.interface";


const schema: mongoose.Schema<Uom> = new mongoose.Schema<Uom>(
    {
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        code: {
            type: String,
            required: [true, 'Uom Code is required.']
        },
        name: {
            type: String,
            required: [true, 'Uom name is required.']
        },
        conversions: {
            type: [
                {
                    name: {
                        type: String,
                        required: [true, "Uom Conversion name is required."]
                    },
                    toUom: {
                        type: mongoose.Schema.ObjectId,
                        ref: 'Uom',
                        autopopulate: true,
                        required: [true, "To Uom Id is required."]
                    },
                    conversionFactor: {
                        type: Number,
                        required: [true, "Uom Conversion factor is required."]
                    },
                }
            ]
        }
    },
    {
        timestamps: true,
        collection: 'uoms'
    }
);

schema.plugin(require('mongoose-autopopulate'));

const UomModel: mongoose.Model<Uom> = mongoose.model<Uom>('Uom', schema);

export default UomModel;