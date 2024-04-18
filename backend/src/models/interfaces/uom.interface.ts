import mongoose from "mongoose";


export interface Uom {
    _id: mongoose.ObjectId,
    isDeleted: boolean,
    isActive: boolean,
    code: string,
    name: string,
    conversions: {
        name: string,
        toUom: Uom | mongoose.ObjectId,
        conversionFactor: number,
    }[]
}