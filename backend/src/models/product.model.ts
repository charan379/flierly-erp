import mongoose from "mongoose";
import { Product } from "./interfaces/product.interface";

const schema: mongoose.Schema<Product> = new mongoose.Schema<Product>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isSerialized: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: [true, "Product name is requried."]
        },
    },
    {
        timestamps: true,
        collection: 'products'
    }
);

const ProductModel: mongoose.Model<Product> = mongoose.model<Product>('Product', schema);

export default ProductModel;