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
        }
    },
    {
        timestamps: true,
        collection: 'uoms'
    }
);

const UomModel: mongoose.Model<Uom> = mongoose.model<Uom>('Uom', schema);

export default UomModel;