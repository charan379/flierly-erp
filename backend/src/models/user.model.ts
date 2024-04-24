import mongoose from "mongoose";
import { User } from "./interfaces/user.interface";


const schema: mongoose.Schema<User> = new mongoose.Schema<User>(
    {
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        username: {
            type: String,
            required: [true, "Username is required."]
        },
        password: {
            type: String,
            required: [true, "User password is required."]
        },
        email: {
            type: String,
            required: [true, "User email is required."]
        },
        mobile: {
            type: String,
            required: [true, "User mobile number is required."]
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const UserModel: mongoose.Model<User> = mongoose.model<User>('User', schema);

export default UserModel;